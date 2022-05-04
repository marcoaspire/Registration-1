import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { EmailValidatorService } from '../../services/email-validator.service';
import Swal from 'sweetalert2';
import { isValidDate, matchPassword } from '../../services/validations';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
    `
      .card {
/*
        padding: 30px 40px;
        margin-top: 60px;
        margin-bottom: 60px;
        border: none !important;
        box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
        */
        margin-top: -150px;
        background: hsla(0, 0%, 100%, 0.8);
        backdrop-filter: blur(30px);
      }
    `
  ]
})
export class RegistrationComponent implements OnInit {

  public stringPattern:string ='([a-zA-Z]+)';
  public phonePattern:string ='^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$';
  public numberPattern:string ='([0-9]+)';

  public status:string[]=[];
  public now = new Date();
  public day = ("0" + this.now.getDate()).slice(-2);
  public month = ("0" + (this.now.getMonth() + 1)).slice(-2);
  public today = this.now.getFullYear()+"-"+(this.month)+"-"+(this.day) ;


   myForm:FormGroup = this.fb.group({
      FirstName: [ 'Marco', [Validators.minLength(2), Validators.required,Validators.pattern(this.stringPattern)] ],
      MiddleName: ['',[Validators.pattern(this.stringPattern),Validators.minLength(2)] ],
      LastName: ['Pacheco', [Validators.required,Validators.pattern(this.stringPattern) ] ],
      EmailAddress: ['marco7@gmail.com', [Validators.email,Validators.required], [this.emailValidator]  ],
      MobilePhone:     ['2223045614',[Validators.minLength(10),Validators.pattern(this.phonePattern)]],
      Last4DigitsSSN: ['1478',[Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern(this.numberPattern)]],
     TermsandConditions : ['',Validators.requiredTrue ],
     EnrolledDate: [this.today,[Validators.required,isValidDate ]],
     Password        : ['123456',[Validators.required,Validators.minLength(6)]],
     ConfirmPassword : ['123',[Validators.required]],
 },{ validators: matchPassword });


//   myForm:FormGroup = this.fb.group({
//     FirstName       : [ '', [Validators.minLength(2), Validators.required,Validators.pattern(this.stringPattern)] ],
//     MiddleName      : ['',[Validators.pattern(this.stringPattern),Validators.minLength(2)] ],
//     LastName        : ['', [Validators.required,Validators.pattern(this.stringPattern) ] ],
//     EmailAddress    : ['', [Validators.email,Validators.required], [this.emailValidator]  ],
//     MobilePhone     : ['',[Validators.required,Validators.minLength(10),Validators.pattern(this.phonePattern)]],
//     Last4DigitsSSN  : ['',[Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern(this.numberPattern)]],
//     TermsandConditions : ['',Validators.requiredTrue ],
//     EnrolledDate    : ['',[Validators.required,isValidDate ]],
//     Password        : ['123456',[Validators.required,Validators.minLength(6)]],
//     ConfirmPassword : ['123',[Validators.required]],
//  },{ validators: matchPassword });

 get dateError():string{
  const errors = this.myForm.get('EnrolledDate')?.errors;
  console.log(errors);

  if (errors?.['required'])
     return "Please select a date";
  else if (errors?.['validateDate'])
     return "Date should be earlier or equal To Today Date";
  return '';
}


 get phoneError():string{
  const errors = this.myForm.get('MobilePhone')?.errors;
  console.log(errors);

  if (errors?.['required'])
     return "Mobile phone is required";
  else if (errors?.['pattern'])
     return "Mobile phone pattern";
  else if (errors?.['minlength'])
     return "Mobile phone has to be 10 numbers ";

  return '';
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

  get middleError():string{
    const errors = this.myForm.get('MiddleName')?.errors;
    console.log(errors);

    if (errors?.['minlength'])
       return "Middle name has to be at least 2 characters ";
    else if (errors?.['pattern'])
       return "Invalid characters";
    return '';
  }

  get firstNameError():string{
    const errors = this.myForm.get('FirstName')?.errors;
    console.log(errors);
    if (errors?.['required'])
       return "First name is required";
    if (errors?.['minlength'])
       return "First name has to be at least 2 characters ";
    else if (errors?.['pattern'])
       return "Invalid characters";
    return '';
  }

  get lastNameError():string{
    const errors = this.myForm.get('LastName')?.errors;
    console.log(errors);
    if (errors?.['required'])
       return "Last name is required";
    if (errors?.['minlength'])
       return "Last name has to be at least 2 characters ";
    else if (errors?.['pattern'])
       return "Invalid characters";
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


  get passwordError():string{
    const errors = this.myForm.get('Password')?.errors;
    if (errors?.['required'])
       return "Password is required";
    else if (errors?.['minlength'])
       return "Password has to be at least 6 characters";
    return '';
  }

  get passwordConfirmError():string{
    const errors = this.myForm.get('ConfirmPassword')?.errors;

    if (this.myForm.get('ConfirmPassword')?.value != this.myForm.get('Password')?.value)
      return "The password confirmation does not match";
    if (errors?.['required'])
       return "Password is required";
    return '';
  }


  constructor(private fb:FormBuilder,private registerService:RegisterService,
              private emailValidator: EmailValidatorService
    ) { }

  ngOnInit(): void {
    this.status=this.registerService.status;



    this.now.setMinutes(this.now.getMinutes() - this.now.getTimezoneOffset());
    console.log(this.now.toISOString().slice(0, 16));

  }

  register(){
    const { FirstName,MiddleName,LastName,EmailAddress,MobilePhone,Last4DigitsSSN,TermsandConditions,Password} = this.myForm.value;
    console.log(this.myForm.value);
    console.log(Password);



    this.registerService.register(Password,FirstName,LastName,EmailAddress,MobilePhone,Last4DigitsSSN,true,3,'Active',MiddleName).subscribe(
      resp => {
        console.log(resp);

        if (resp.ok === true)
        {
            //user saved
            //alert('User saved');
            Swal.fire('User saved');
         }
         else {
           //show error msg
           Swal.fire('Error', resp.msg, 'error');
         }
      }
      );



  }
  isValid(field: string){
    if (field == 'ConfirmPassword')
    {
      return this.myForm.controls[field].errors && this.myForm.controls[field].touched || this.myForm.errors;
    }
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

}
