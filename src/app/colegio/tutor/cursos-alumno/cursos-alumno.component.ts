import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { CursosAlumnoService } from "../_services/cursos-alumno.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-cursos-alumno',
  templateUrl: './cursos-alumno.component.html',
  styleUrls: ['./cursos-alumno.component.css']
})
export class CursosAlumnoComponent implements OnInit {
  @Input() id:any;
  Table:any
  selectedData:any
  Id:any = localStorage.getItem('currentIdStudent');
  tipo:any
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location:Location,
    private router:Router,
    private mainService: CursosAlumnoService
  ) { }
  
    ngOnInit() {
      this.route.params
      .switchMap((params: Params) => (params['op']))
      .subscribe(response => { 
                        this.tipo=response
                    });
      this.cargarAll()
    }
    goBack(): void {
      this.location.back();
    }
    cargarAll(){
      this.mainService.getAll(this.tipo)
                        .then(response => {
                          this.Table = response
                          console.clear 
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }
    cargarSingle(id:number){
      this.mainService.getSingle(id)
                        .then(response => {
                          this.selectedData = response;
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }

    
  public options = {
               position: ["bottom", "right"],
               timeOut: 2000,
               lastOnBottom: false,
               animate: "fromLeft",  
               showProgressBar: false,
               pauseOnHover: true,
               clickToClose: true,
               maxLength: 200
           };
  
    create(success) {
                this._service.success('¡Éxito!',success)

    }
    createError(error) {
                this._service.error('¡Error!',error)

    }
}
