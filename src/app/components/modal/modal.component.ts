import { Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/User/interfaces/interfaces';
import { EmailValidatorService } from 'src/app/User/services/email-validator.service';
import { EmployeeServiceService } from 'src/app/User/services/employee-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {
  public myForm!:FormGroup;
  
  public stringPattern:string ='([a-zA-Z]+)';
  public phonePattern:string ='^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$';
  public numberPattern:string ='([0-9]+)';

  

  @Input() item!: Employee; 
  constructor(public employeeService: EmployeeServiceService,private fb:FormBuilder,
    private emailValidator: EmailValidatorService
    ) { }

  ngOnInit(): void {
    console.log("Init modal:"+this.item.user.firstName);
        
    this.myForm= this.fb.group({
      FirstName     : [this.item.user.firstName,Validators.required],
      MiddleName    : [this.item.user.middleName,[Validators.pattern(this.stringPattern),Validators.minLength(2)] ],
      LastName      : [this.item.user.lastName, [Validators.required,Validators.pattern(this.stringPattern) ] ],
      EmailAddress  : [this.item.user.emailAddress, [Validators.email,Validators.required], [this.emailValidator]  ],
      MobilePhone   : [this.item.user.mobilePhone,[Validators.minLength(10),Validators.pattern(this.phonePattern)]],
      Last4DigitsSSN: [this.item.user.last4DigitsSSN,[Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern(this.numberPattern)]],
      //Password        : ['123456',[Validators.required,Validators.minLength(6)]],
      //ConfirmPassword : ['123456',[Validators.required]],
  
    });
    
  }

  closeModal(){
    console.log(this.item.user.userID);
    this.employeeService.closeModal();
    
  }
  upload(){
    console.log('save');
    console.log(this.item.user.userID);

    console.log(this.myForm.value);
    this.employeeService.updateUser(this.item.user.userID,this.myForm.value)
    .subscribe({
      //{results: {…}, msg: 'user updated'} alert
      next: res=>{
        console.log(res);
        
      },
      error: err => console.log(err)
      
    });


    
    
  }

}
