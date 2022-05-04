import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  public numberPattern:string ='([0-9]+)';
  myForm:FormGroup = this.fb.group({
    EmailAddress    : ['marco7@gmail.com', [Validators.email,Validators.required] ],
    Password        : ['123456',[Validators.required,Validators.minLength(6)]],

  });

  constructor(private fb:FormBuilder,private registerService:RegisterService) { }

  ngOnInit(): void {
  }

  login(){

    console.log(this.myForm.value);
    const { EmailAddress,Password} = this.myForm.value;


    this.registerService.login(EmailAddress,Password).subscribe(
      resp => {
        console.log("recieved:");

        console.log(resp);

        if (resp.ok===true)
        {
          //this.router.navigateByUrl('/dashboard');
          console.log("redirect to home");

        }
        else{
          //TODO: Error msg
          Swal.fire('Error', resp.msg, 'error');
        }

      }
    );


  }

  get emailError():string{
    const errors = this.myForm.get('EmailAddress')?.errors;
    console.log(errors);
    if (errors?.['required'])
       return "Email is required";
    else if (errors?.['email'])
       return "Email pattern";
    else if (errors?.['emailTaken'])
      return "Email has taken";
    return '';
  }

  get snnError():string{
    const errors = this.myForm.get('Last4DigitsSSN')?.errors;
    console.log(errors);
    //unique
    if (errors?.['required'])
       return "SNN/ID is required";
    else if (errors?.['minlength'])
       return "SNN/ID has to be 4 numbers ";
    else if (errors?.['maxlength'])
       return "SNN/ID has to be 4 numbers ";
    else if (errors?.['pattern'])
       return "Invalid characters";
    return '';
  }

  isValid(field: string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }


}
