import { Component, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee, User } from 'src/app/User/interfaces/interfaces';
import { EmailValidatorService } from 'src/app/User/services/email-validator.service';
import { EmployeeService} from 'src/app/User/services/employee-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit,OnDestroy {
  public myForm!:FormGroup;
  
  public stringPattern:string ='([a-zA-Z]+)';
  public phonePattern:string ='^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$';
  public numberPattern:string ='([0-9]+)';

  

  @Input() user!: User;
  @Output() onUserUpdated:EventEmitter<boolean> = new EventEmitter(); 
  
  

  constructor(public employeeService: EmployeeService,private fb:FormBuilder,
    private emailValidator: EmailValidatorService
    ) { 
      
    }
  ngOnDestroy(): void {
    console.log("destruido modal");

  }

  ngOnInit(): void {
    console.log("creado modal");
    this.user= this.employeeService.user;
    
        
    this.myForm= this.fb.group({
      FirstName     : [this.user.firstName,Validators.required],
      MiddleName    : [this.user.middleName,[Validators.pattern(this.stringPattern),Validators.minLength(2)] ],
      LastName      : [this.user.lastName, [Validators.required,Validators.pattern(this.stringPattern) ] ],
      EmailAddress  : [this.user.emailAddress, [Validators.email,Validators.required], [this.emailValidator]  ],
      MobilePhone   : [this.user.mobilePhone,[Validators.minLength(10),Validators.pattern(this.phonePattern)]],
      Last4DigitsSSN: [this.user.last4DigitsSSN,[Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern(this.numberPattern)]],
      //Password        : ['123456',[Validators.required,Validators.minLength(6)]],
      //ConfirmPassword : ['123456',[Validators.required]],
  
    });
    
  }

  closeModal(){
    this.employeeService.closeModal();
    
  }
  upload(){
    this.employeeService.updateUser(this.user.userID,this.myForm.value)
    .subscribe({
      //{results: {…}, msg: 'user updated'} alert
      next: res=>{
        Swal.fire(
          'Updated!',
          'User has been updated.',
          'success'
        ); 
        this.onUserUpdated.emit(true);
        this.closeModal();
      },
      error: err => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      }) 
      
    });
  }

}
