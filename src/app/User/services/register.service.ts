import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError,tap } from "rxjs/operators";
import { of,Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private endPoint: string= `http://localhost:63253`;

  private _status:string[] = [
    "Active", "DeActive"
  ];

  get status():string[]{
    return [ ...this._status];
  }


  constructor(private http: HttpClient) { }
  register(password:string,firstName:string,lastName:string, emailAddress:string,mobilePhone:string,last4DigitsSSN:number,
    termsandConditions:boolean=true,maxLoginAttempt:number=3,status:string='Active',middleName?:string){
    const lastLogin=null;
    const url = `${this.endPoint}/api/User/new`;

    if (!middleName)
    {
      var middleName2=null;
    }
    else{
      middleName2=middleName;
    }

    const body = { password,firstName,lastName,emailAddress,mobilePhone,last4DigitsSSN,termsandConditions,maxLoginAttempt,status,lastLogin,middleName};

    console.log(body);

    console.log(JSON.stringify(body));




    return this.http.post<any>( url,body).pipe(
      tap(resp =>{
        console.log("register response"+resp);

        if (resp.ok)
        {
            //TODO: Msg saved
            console.log("user saved"+resp);
        }

      }),
      map( resp => resp),
      catchError( err => of(err.error.msg))
    );

  }


  login(emailAddress: string, password: string){
    const url = `${this.endPoint}/api/User`;
    const body = { emailAddress, password};
    console.log(body);

    return this.http.post(url,body)
    .pipe(
      tap(resp =>{
        console.log("login response");
        console.log(resp);
        console.log("login response");

      }),
      map( resp => resp),
      catchError( err => of(err.error.msg))
    );
  }

}
