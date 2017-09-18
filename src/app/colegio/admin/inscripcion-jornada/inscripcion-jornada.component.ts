import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { InscriptionsStudyingDayService } from "../_services/_asignaciones/inscriptions-studying-day.service";
import { InscriptionsService } from "../_services/_asignaciones/inscriptions.service";
import { CiclosJornadaService } from "../_services/_asignaciones/ciclos-jornada.service";
import { ChargesService } from "../_services/charges.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs/Rx';
@Component({
  selector: 'app-inscripcion-jornada',
  templateUrl: './inscripcion-jornada.component.html',
  styleUrls: ['./inscripcion-jornada.component.css']
})
export class InscripcionJornadaComponent implements OnInit {
  Table:any
  search:any
  selectedData:any[]
  droppedItemsId:any=[]
  childs:any[]
  childsId:any=[]
  droppedItems:any=[]
  parentCombo:any
  selectedParent:any
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();
  selectedDate:any = {
    begin:'',
    end:'',
    inscription:'',
    tuiton:'',
    id:''
  }
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private mainService: InscriptionsStudyingDayService,
    private ChildsService: InscriptionsService,
    private ParentsService: CiclosJornadaService,
    private alternService: ChargesService
  ) { }
    ngOnInit() {
      this.dtOptions = {
        pagingType: 'full_numbers',
        language: {
          emptyTable: 'Tabla limpia',
          info: 'Mostrando página _PAGE_ de _PAGES_',
          infoEmpty: 'No hay registros disponibles',
          infoFiltered: '(filtrado de _MAX_ registros totales)',
          zeroRecords: 'Nada para mostrar, lo sentimos',
          search: 'Buscar',
          lengthMenu: 'Mostranto _MENU_ registro por página',
          paginate: {
            first: 'Primero',
            last: 'Ultimo',
            next: 'Siguiente',
            previous: 'Anterior'
          }
  
        }
      };
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
          let existe=(this.selectedData.find(dat=>{
            return dat.id==e.dragData.id
          }))

          if(!existe){
            let aF1 = this.selectedDate.begin.split("-");
            let aF2 = this.selectedDate.end.split("-");
            
            let numMeses = aF2[0]*12 + aF2[1] - (aF1[0]*12 + aF1[1]);
            if (aF2[2]<aF1[2]){
              numMeses = numMeses - 1;
            }
            this.selectedDate.id=e.dragData.id
            
            this.droppedItemsId.push({"id":e.dragData.id});
            this.selectedData.push(e.dragData);

            this.makeCharge(numMeses)
            
          }
            // this.childs.splice(this.childs.findIndex(dat=>{
            //   return dat.id==e.dragData.id
            // }),1)
            // this.childsId.splice(this.childsId.findIndex(dat=>{
            //   return dat.id==e.dragData.id
            // }),1)
          }
    }

    onItemRemove(e: any) {
        // Get the dropped data here 
        this.selectedDate.id=e.dragData.id
           this.childsId.push({"id":e.dragData.id});
          // this.childs.push(e.dragData);
          this.selectedData.splice(this.selectedData.findIndex(dat=>{
            return dat.id==e.dragData.id
          }),1)
          this.droppedItemsId.splice(this.droppedItemsId.findIndex(dat=>{
            return dat.id==e.dragData.id
          }),1)

          let aF1 = this.selectedDate.begin.split("-");
          let aF2 = this.selectedDate.end.split("-");
          
          let numMeses = aF2[0]*12 + aF2[1] - (aF1[0]*12 + aF1[1]);
          if (aF2[2]<aF1[2]){
            numMeses = numMeses - 1;
          }
          

          this.deleteCharge(numMeses)
        

        
    }
    cargarFree(){
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
      this.dtTrigger = new Subject<any>();
      this.mainService.getBussy()
                        .then(response => {
                          this.Table = response
                          this.dtTrigger.next()                          
                          $("#editModal .close").click();
                          $("#insertModal .close").click();
                          console.clear 
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
    }
    cargarSingle(id:number){
      let values:any = (id+'').split(',')
      this.selectedDate ={
        begin: values[1],
        end: values[2],
        inscription:values[3],
        tuiton:values[4],
        id:values[0]
      }
      this.selectedParent=id
      this.droppedItemsId.length = 0;
      this.childsId.length = 0;
      this.cargarFree()
      this.mainService.getMyChilds(values[0])
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
      let values:any = (this.selectedParent+'').split(',')
      let formValue = {
        "master":values[0],
        "inscription": this.droppedItemsId
      }

      formValueDel = {
        "master":values[0],
        "inscription": this.childsId
      }
      // console.log(formValue);
      // console.log(formValueDel);
      
      
      if(this.selectedParent){   
      this.mainService.deleteAll(formValueDel)
                        .then(response => {
                          this.insert(formValue)
                          this.create('Grados Desasignados')
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
    makeCharge(cant:number){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      let data = {
        "inscription":this.selectedDate.id,
        "charges": [
          {
            "tuition":false,
            "inscription":true,
            "charge_limit":this.selectedDate.begin.substring(0,8)+'17',
            "quantity":this.selectedDate.inscription,
            "increase":"15",
            "idinscription":this.selectedDate.id
          }
        ]
      }
      let dates = this.selectedDate.begin.split('-')
      for(let i=0;i<cant;i++){
        let month=((dates[1]*1)+i)
      data.charges.push(

        {
          "tuition":true,
          "inscription":false,
          "charge_limit":dates[0]+'-'+((month<10)?'0'+month:month)+'-'+'15',
          "quantity":this.selectedDate.tuiton,
          "increase":"15",
          "idinscription":this.selectedDate.id
        }
      )
    }
      this.alternService.createAll(data)
                        .then(response => {
                          console.clear 
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear     
                          this.createError(error) 
                        })
      
    }

    deleteCharge(cant:number){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      let data = {
        "inscription":this.selectedDate.id,
        "charges": [
          {
            "tuition":false,
            "inscription":true,
            "charge_limit":this.selectedDate.begin.substring(0,8)+'17',
            "quantity":this.selectedDate.inscription,
            "increase":"15",
            "idinscription":this.selectedDate.id
          }
        ]
      }
      let dates = this.selectedDate.begin.split('-')
      for(let i=0;i<cant;i++){
        let month=((dates[1]*1)+i)
      data.charges.push(

        {
          "tuition":true,
          "inscription":false,
          "charge_limit":dates[0]+'-'+((month<10)?'0'+month:month)+'-'+'15',
          "quantity":this.selectedDate.tuiton,
          "increase":"15",
          "idinscription":this.selectedDate.id
        }
      )
    }
      this.alternService.deleteAll(data)
                        .then(response => {
                          console.clear 
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

