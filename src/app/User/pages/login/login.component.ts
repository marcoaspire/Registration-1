import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .card {

        padding: 30px 40px;
        margin-top: 60px;
        margin-bottom: 60px;
        border: none !important;
        box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
        
        /* background-image: url('../../../../assets/images/bg-03.jpg'); */

        
      }

    `
  ]
})
export class LoginComponent implements OnInit {
  public numberPattern:string ='([0-9]+)';
  myForm:FormGroup = this.fb.group({
    EmailAddress    : ['juan@gmail.com', [Validators.email,Validators.required] ],
    Password        : ['123456',[Validators.required,Validators.minLength(6)]],

  });

  constructor(private fb:FormBuilder,private registerService:RegisterService, private router:Router,
        private employeeService:EmployeeService
    ) { }

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
          console.log(resp);
          
          this.employeeService.setAuth(resp.id);
          localStorage.setItem('id', resp.id);

          this.router.navigateByUrl('/employees');
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
