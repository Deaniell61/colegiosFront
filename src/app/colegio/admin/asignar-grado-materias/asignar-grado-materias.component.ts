import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { GradoMateriaService } from "../_services/_asignaciones/grado-materia.service";
import { SubjectsService } from "../_services/subjects.service";
import { JornadaGradoService } from "../_services/_asignaciones/jornada-grado.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs/Rx';
@Component({
  selector: 'app-asignar-grado-materias',
  templateUrl: './asignar-grado-materias.component.html',
  styleUrls: ['./asignar-grado-materias.component.css']
})
export class AsignarGradoMateriasComponent implements OnInit {
  Table:any
  selectedData:any[]
  selectedDataId:any
  droppedItemsId:any=[]
  childs:any[]
  childsId:any=[]
  droppedItems:any=[]
  parentCombo:any
  grandParentCombo:any
  selectedParent:any
  selectedGrandParent:any
  public rowsOnPage = 5;
  public search:any
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private mainService: GradoMateriaService,
    private ChildsService: SubjectsService,
    private ParentsService: JornadaGradoService
  ) { }
    ngOnInit() {
      
      this.cargarAll()
      this.childsId.length = 0;
      this.cargarFree()
      this.ParentsService.getBussy()
                        .then(response => {
                          this.grandParentCombo = response
                          
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
          let existe=(this.selectedData.find(dat=>{
            return dat.id==e.dragData.id
          }))

          if(!existe){
            this.droppedItemsId.push({"id":e.dragData.id});
            this.selectedData.push(e.dragData);}
            // this.childs.splice(this.childs.findIndex(dat=>{
            //   return dat.id==e.dragData.id
            // }),1)
            // this.childsId.splice(this.childsId.findIndex(dat=>{
            //   return dat.id==e.dragData.id
            // }),1)
            // console.log(this.droppedItemsId);
            
          }
    }

    onItemRemove(e: any) {
        // Get the dropped data here 
          
           //this.childsId.push({"id":e.dragData.id});
          // this.childs.push(e.dragData);
          this.selectedData.splice(this.selectedData.findIndex(dat=>{
            return dat.id==e.dragData.id
          }),1)
          this.droppedItemsId.splice(this.droppedItemsId.findIndex(dat=>{
            return dat.id==e.dragData.id
          }),1)
        

        
    }
    cargarFree(){
      this.childsId.length = 0;
      this.ChildsService.getAll()
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
      this.mainService.getBussy()
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
    cargarSingle(id:number,id2:number){

      this.selectedGrandParent=id2
      this.cargarFree()
      this.mainService.getMyChilds(id2)
                        .then(response => {
                          this.parentCombo = response
                          
                          console.clear 
                                                    
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })

      this.selectedParent=id
      this.droppedItemsId.length = 0;
      this.childsId.length = 0;
      this.mainService.getMyId(id2,id)
                          .then(response => {
                            this.selectedDataId=response.id
                            this.cargarFree()
                            this.mainService.getMyGrandChilds(this.selectedDataId)
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
                            
                            console.clear 
                                                      
                          }).catch(error => {
                            console.clear     
                            this.createError(error) 
                          })
      
    }
    cargarGrandChilds(id:number){
      this.selectedParent=id
      this.droppedItemsId.length = 0;
      this.childsId.length = 0;
      this.mainService.getMyId(this.selectedGrandParent,id)
                          .then(response => {
                            this.selectedDataId=response.id
                            this.cargarFree()
                            this.mainService.getMyGrandChilds(this.selectedDataId)
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
                            console.clear 
                                                      
                          }).catch(error => {
                            console.clear     
                            this.createError(error) 
                          })
      
    }
    cargarChild(id:number){
      this.selectedGrandParent=id
      this.childsId.length = 0;
      this.cargarFree()
      this.mainService.getMyChilds(id)
                        .then(response => {
                          this.parentCombo = response
                          
                          console.clear 
                                                    
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }
    update(formValue:any){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      //console.log(data)
      this.mainService.update(formValue)
                        .then(response => {
                          this.cargarAll()
                          console.clear 
                          this.create('Ciclo Actualizado exitosamente')
                          $('#Loading').css('display','none')
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
                          this.create('Grados Desasignados')
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
      
    }
    delete(formValueDel){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.droppedItemsId.forEach(element => {
        this.childsId.splice(this.childsId.findIndex(dat => {
          return dat.id==element.id
        }),1)
      })
      let formValue = {
        "grade":this.selectedDataId,
        "subjects": this.droppedItemsId
      }

      formValueDel = {
        "grade":this.selectedDataId,
        "subjects": this.childsId
      }
      // console.log(formValue);
      // console.log(formValueDel);
      
      
      if(this.selectedParent){   
      this.mainService.deleteAll(formValueDel)
                        .then(response => {
                          this.insert(formValue)
                          this.create('Materias Desasignadas')
                        }).catch(error => {
                          this.insert(formValue)
                          console.clear     
                          this.createError(error) 
                        })
                      }else{
                        this.createError("Debe seleccionar un Ciclo-Jornada") 
                      }
      
    }
    insert(formValue:any){
      
      this.mainService.create(formValue)
                        .then(response => {
                          this.cargarAll()
                          console.clear 
                          this.create('Grados Asignados')
                          $('#Loading').css('display','none')
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
