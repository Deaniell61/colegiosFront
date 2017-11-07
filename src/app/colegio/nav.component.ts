import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";

import { UsuariosService } from "./admin/_services/usuarios.service";
import { NotificacionesService } from "./maestro/_services/notificaciones.service";
import { NotificationsService } from 'angular2-notifications';

declare var $: any

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user=localStorage.getItem('currentUser');
  firstname=localStorage.getItem('currentFirstName');
  lastname=localStorage.getItem('currentLastName');
  picture=localStorage.getItem('currentPicture');
  id=localStorage.getItem('currentId');
  type=localStorage.getItem('currentType');
  state=localStorage.getItem('currentState');
  click:boolean
  notifications:any = []
  nNotifications:number = 0;
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsuariosService,
    private notificationsService: NotificacionesService
  ) { }

  ngOnInit() {
    if(this.state=='2'){
      $('#ChangePass').modal();
    }
    if(this.type=="tutor"){
      this.cargarNotifications();
    }
  }
  cargarNotifications()
  {
    this.nNotifications=0;
    this.notifications.length =0;
    let id=localStorage.getItem('currentIdTutor');
    this.notificationsService.getTutorAll(+id)
                      .then(response => {
                        response.forEach(element => {
                          if(element.state==3){
                            this.nNotifications++;
                          }
                          if(element.state>=2){
                            this.notifications.push(element);
                          }
                        });
                        console.clear 
                      }).catch(error => {
                        console.clear     
                        this.createError(error) 
                        
                        $('#Loading').css('display','none')
                      })
  }
  updateNotifications(){
    let id=localStorage.getItem('currentIdTutor');
    let form:any = {
      id: id,
      state: 2
    }
    this.notificationsService.updateByTutor(form)
                        .then(response => {
                          this.cargarNotifications();
                          console.clear 
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                          
                          $('#Loading').css('display','none')
                        })
  }

  updateNotification(id){
    let form:any = {
      id: id,
      state: 1
    }
    this.notificationsService.update(form)
                        .then(response => {
                          this.cargarNotifications();
                          console.clear 
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                          
                          $('#Loading').css('display','none')
                        })
  }

  hideNav(){
    if(!this.click){
      $('#page-wrapper').css('margin-left','0px')
      $('.nicescroll').css('width','0px')
      $('#apple-admin').css('display','none')
      $('.top-left-part').css('width','70px')
      this.click = !this.click
    }else{
      $('#page-wrapper').css('margin-left','')
      $('.nicescroll').css('width','')
      $('#apple-admin').css('display','')
      $('.top-left-part').css('width','')
      this.click = !this.click
    }
    
  }
  updatePass(formValue:any){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    
    
    
    let data = {
      id: this.id,
      old_pass: formValue.old_pass,
      new_pass: formValue.new_pass,
      new_pass_rep: formValue.new_pass2
    }
    //console.log(data)
    this.userService.updatePass(data)
                      .then(response => {
                        console.clear 
                        this.create('Usuario Actualizado exitosamente')
                        $('#Loading').css('display','none')
                        $("#ChangePass .close").click();
                        $('#passChange-form')[0].reset()
    
                      }).catch(error => {
                        console.clear     
                        this.createError(error) 
                        
                        $('#Loading').css('display','none')
                      })
    
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentEmail');
    localStorage.removeItem('currentFirstName');
    localStorage.removeItem('currentLastName');
    localStorage.removeItem('currentId');
    localStorage.removeItem('currentType');
    location.reload();
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
