import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, of } from 'rxjs';
import { map, catchError,tap,delay } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Employee, User } from '../interfaces/interfaces';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  public user!:any;
  private _hideModal:boolean = true;
  //public id2!:number;

  
  constructor(private http:HttpClient) { }


  get hideModal(){
    return this._hideModal;
  }

  get id():number{
    return this.user.userID|| -1;
  }

  search(term:string){
    // http://localhost:63253/users?email=juan

    return this.http.get(`${base_url}/users?email=${term}`)
    .pipe(
      map((resp:any) => {
        console.log(resp);
        return resp;
        // return this.convertUsers(resp.users);
      })
    );
  }

  async setUser(id:number){
    //http://localhost:63253/api/User/4
    const end=this.http.get<Employee>(`${base_url}/api/User/${id}`);
    return await lastValueFrom(end)
      .then(resp => {
        this.user=resp;
        console.log(resp);
        console.log(this.user);
        
      });
    /*
    .subscribe({
      next: employee => {
        console.log("cambiando user");
        
        this.user=employee.user;
      },
      error: err => console.log(err)
    });
    */
  }

  saveEmployee(user:Employee){
    console.log('change role');
    
    console.log(user.role);
    //http://localhost:63253/api/Employee/156456
    return this.http.put(`${base_url}/api/Employee/${user.user.userID}`, user);
  }

  updateUser(id:number,user:User){
    //http://localhost:63253/api/User/12566
    user ={
      ...user,
      userID:id
    }
    console.log(user);
    //return of(true);
    return this.http.put(`${base_url}/api/User/${id}`, user);

  }

  
  loadUsers(){
    //http://localhost:63253/users
    return this.http.get<Employee[]>(`${base_url}/users`)
    /*
    .pipe(
      //delay(500),
      map( resp =>{
        console.log(resp);
        
        //const users = resp.map(user => new User() )
        return {
          //users
          resp
        };
      })
    );
    */
  }
  
  
  deleteUser(user:any){
   http://localhost:63253/api/User/12
    return this.http.delete(`${base_url}/api/User/${user.userID}`);
  }


  openModal(
    user:User
  ){
    console.log("recibido que debe estar en modal:" +user.firstName);
    
    console.log(user);
    
    this._hideModal=false;

    //TODO: cREATE A MODAL
    


  }


  closeModal(){
    console.log("ocultando modal");
    
    this._hideModal=true;
  }


}
