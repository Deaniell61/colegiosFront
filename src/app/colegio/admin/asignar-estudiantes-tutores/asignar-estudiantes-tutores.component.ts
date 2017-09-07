import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { EstudiantesTutoresService } from "../_services/_asignaciones/estudiantes-tutores.service";
import { StudentsService } from "../_services/students.service";
import { TutorsService } from "../_services/tutors.service";
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-asignar-estudiantes-tutores',
  templateUrl: './asignar-estudiantes-tutores.component.html',
  styleUrls: ['./asignar-estudiantes-tutores.component.css']
})
export class AsignarEstudiantesTutoresComponent implements OnInit {
  Table:any
  selectedData:any[]
  droppedItemsId:any=[]
  childs:any[]
  childsId:any=[]
  droppedItems:any=[]
  parentCombo:any
  selectedParent:any
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private mainService: EstudiantesTutoresService,
    private ChildsService: StudentsService,
    private ParentsService: TutorsService
  ) { }
    ngOnInit() {
      this.cargarAll()
      this.cargarFree()
      this.ParentsService.getAll()
                        .then(response => {
                          this.parentCombo = response
                          
                          console.clear 
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }
    onItemDrop(e: any) {
        // Get the dropped data here 
        if(!this.selectedParent){
          this.createError("Debe seleccionar un tutor")
        }else{
          this.droppedItemsId.push({"id":e.dragData.id});
          this.selectedData.push(e.dragData);
          this.childs.splice(this.childs.findIndex(dat=>{
            return dat.id==e.dragData.id
          }),1)
          this.childsId.splice(this.childsId.findIndex(dat=>{
            return dat.id==e.dragData.id
          }),1)
        }
    }

    onItemRemove(e: any) {
        // Get the dropped data here 
          
          this.childsId.push({"id":e.dragData.id});
          this.childs.push(e.dragData);
          this.selectedData.splice(this.selectedData.findIndex(dat=>{
            return dat.id==e.dragData.id
          }),1)
          this.droppedItemsId.splice(this.droppedItemsId.findIndex(dat=>{
            return dat.id==e.dragData.id
          }),1)
        

        
    }
    cargarFree(){
      this.ChildsService.getFreeStudents()
                        .then(response => {
                          this.childs = response
                          this.childs.forEach((item,index)=>{
                            this.childsId.push({"id":item.id});
                          })
                          console.clear 
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }
    cargarAll(){
      this.ParentsService.getBussy()
                        .then(response => {
                          this.Table = response
                          $("#editModal .close").click();
                          $("#insertModal .close").click();
                          console.clear 
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }
    cargarSingle(id:number){
      this.selectedParent=id
      this.droppedItemsId.length = 0;
      this.cargarFree()
      this.mainService.getMyChilds(id)
                        .then(response => {
                          this.selectedData = response
                          this.selectedData.forEach((item,index)=>{
                            this.droppedItemsId.push({"id":item.id});
                          })
                          console.clear 
                                                    
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }
    update(formValue:any){
      
      //console.log(data)
      this.mainService.update(formValue)
                        .then(response => {
                          this.cargarAll()
                          console.clear 
                          this.create('Ciclo Actualizado exitosamente')
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
      
    }
    delete2(id:string){
      this.mainService.delete(id)
                        .then(response => {
                          this.cargarAll()
                          console.clear 
                          this.create('Estudiantes Desasignados')
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
      
    }
    delete(formValue){
      this.mainService.deleteAll(formValue)
                        .then(response => {
                          this.cargarAll()
                          console.clear 
                          this.create('Estudiantes Desasignados')
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
      
    }
    insert(formValue:any){
      
      formValue = {
        "tutor":this.selectedParent,
        "students": this.droppedItemsId
      }

      let formValueDel = {
        "tutor":this.selectedParent,
        "students": this.childsId
      }
          
    if(this.selectedParent){      
      this.mainService.create(formValue)
                        .then(response => {
                          this.create('Estudiantes Asignados')
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
      
                      }else{
                        this.createError("Debe seleccionar un Tutor") 
                      }
    this.delete(formValueDel)
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
