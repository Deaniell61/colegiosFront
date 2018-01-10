import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { path } from "../../../config.module";

import "rxjs/add/operator/toPromise"; 


@Injectable()
export class UsuariosService {

  headers = new Headers({'Access-Control-Allow-Origin':'*',
  'cache-control':'no-cache',
  'server':'Apache/2.4.18 (Ubuntu)',
  'x-ratelimit-limit':'60',
  'x-ratelimit-remaining':'59'})
private basePath:string = path.path

constructor(private http:Http){

}

private handleError(error:any):Promise<any> {
console.error("ha ocurrido un error")
console.log(error)
return Promise.reject(error.message || error)
}

  getAll():Promise<any> {
  let url = `${this.basePath}/api/users`

    return this.http.get(url)
                    .toPromise()
                      .then(response => {
                        //console.log(response.json())
                        return response.json()
                      })
                      .catch(this.handleError)                  
  }
  create(form):Promise<any> {
    let url = `${this.basePath}/api/users`
  
      return this.http.post(url,form)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
  updatePass(form):Promise<any> {
    let url = `${this.basePath}/api/users/${form.id}/changepassword`
  
      return this.http.post(url,form)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
  delete(id):Promise<any> {
    let url = `${this.basePath}/api/users/${id}`
  
      return this.http.delete(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
  update(form):Promise<any> {
    let url = `${this.basePath}/api/users/${form.id}`
  
      return this.http.put(url,form)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
  getTypes():Promise<any> {
    let url = `${this.basePath}/api/userstypes`
  
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
  getTutors():Promise<any> {
    let url = `${this.basePath}/api/tutors`
  
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
  getTeachers():Promise<any> {
    let url = `${this.basePath}/api/teachers`
  
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
  getStudents():Promise<any> {
    let url = `${this.basePath}/api/students`
  
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
  getTutor(id:string):Promise<any> {
    let url = `${this.basePath}/api/tutors/${id}`
  
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
  getTeacher(id:string):Promise<any> {
    let url = `${this.basePath}/api/teachers/${id}`
  
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
  getStudent(id:string):Promise<any> {
    let url = `${this.basePath}/api/students/${id}`
  
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }  
  getSingle(id:number):Promise<any> {
    let url = `${this.basePath}/api/users/${id}`
  
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response.json()
                        })
                        .catch(this.handleError)                  
    }
}
