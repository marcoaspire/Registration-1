import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, of, Subject } from 'rxjs';
import { map, catchError,tap,delay } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Employee, User } from '../interfaces/interfaces';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public auth!:Employee;

  public user!:User;
  private _hideModal:boolean = true;
  //public id2!:number;
  public allUsers:Employee[]=[];

  /** Communication */
  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any) {
      this.emitChangeSource.next(change);
  }
 /** Communication */

  
  constructor(private http:HttpClient,private router:Router) { }


  get hideModal(){
    return this._hideModal;
  }

  get id():number{
    return this.auth.user.userID|| -1;
  }

  search(term:string){
    // http://localhost:63253/users?email=juan
    return this.http.get(`${base_url}/users?email=${term}`)
    .pipe(
      map((resp:any) => {
        return resp;
        // return this.convertUsers(resp.users);
      })
    );
  }

  async setAuth(id:number){
    //http://localhost:63253/api/User/4
    const end=this.http.get<any>(`${base_url}/api/User/${id}`);
    return await lastValueFrom(end)
      .then(resp => {
        this.auth=resp.user;
      });    
  }

  saveEmployee(user:Employee){
    console.log('change role');
    
    console.log(user.role);
    //http://localhost:63253/api/Employee/156456
    return this.http.put(`${base_url}/api/Employee/${user.user.userID}`, user);
  }

  updateUser2(id:number,user:User){
    //http://localhost:63253/api/User/12566
    console.log(user);
    
    user ={
      ...user,
      userID:id
    }
    console.log("user data to update");
    
    console.log(user.password);
    


    return this.http.put(`${base_url}/api/User/${id}`, user);

  }


  updateUser(id:number,user:User){
    let changes:any[]=[];
    //iterate object to get keys and their value
    /*
              [
              {
                "path": "last4DigitsSSN",
                "op": "replace",
                "value": 4123 
              },
              {
                "path": "termsandConditions",
                "op": "replace",
                "value": true
              }
            ]
    */
   
    let claves = Object.keys(user); 
    for(let i=0; i< claves.length; i++){
      let clave:string = claves[i];
      let change = {
        path:clave, 
        op: "replace",
        value:user[clave as keyof User]
      };
      changes.push(change);
    }    


    return this.http.patch(`${base_url}/api/User/${id}`, changes);
    
  }

  
  
  loadUsers(){
    //http://localhost:63253/users
    return this.http.get<Employee[]>(`${base_url}/users`)
    /*
    .pipe(
      //delay(500),
      map( users =>{
        console.log("respuesta load user");
        
        console.log(users);

        
        //const users = resp.map(user => new User() )
        return {
          //users
          users
        };
      })
    );
    */
    
  }
  
  
  deleteUser(user:any){
   http://localhost:63253/api/User/12
    return this.http.delete(`${base_url}/api/User/${user.userID}`);
  }


  openModal(user:User){
    //create modal and assing a user
    this._hideModal=false;
    this.user=user;

  }


  
  closeModal(){
    console.log("cerrando modal");
    
    this._hideModal=true;

    
  }

  logout(){
    localStorage.removeItem('id');
    this.router.navigateByUrl('/login');
    /*
    this.ngZone.run(()=>{

    });
    */
  }



}
