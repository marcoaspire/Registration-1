import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {
  constructor(private http: HttpClient) { }
  validate(control:AbstractControl):Observable<ValidationErrors| null>  {
    const email = control.value;
    return this.http.get<any[]>(`http://localhost:63253/users?email=${email}`)
      .pipe(
        map(resp => {
          console.log(

            Object.keys(resp).length

          );
          return (resp
            && Object.keys(resp).length === 0
            ) ? null : { emailTaken:true}
        })
      )
    ;
  }



}
