import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { SalaryInputComponent } from 'src/app/components/salary-input/salary-input.component';

import Swal from 'sweetalert2';
import { Employee, User } from '../../interfaces/interfaces';
import { EmployeeService } from '../../services/employee-service.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styles: [
    `
      .form-group label {
        color: grey;
      }

      .form-group input {
        font-weight: 500;
      }

      .form-group input::placeholder {
        color: #c0bdbd;
        font-weight: 300;
      }

      thead th{
        font-weight: 400;
      }

      table tr:hover {
        background-color: #fffbf2;
        cursor: pointer;
      }

      /*for invalid form controls*/
      input.invalid {
        border-color: red;
      }
    `
  ]
})

export class EmployeesComponent implements OnInit {

  @Output() onLoadUser:EventEmitter<User> = new EventEmitter(); 

  //@ViewChildren('txtSalary') txtSalary!:QueryList<SalaryInputComponent>;
  public users!:Employee[];
  public usersAux!:Employee[];
  public loading:boolean=true;
  public total:number=0;
  public k:boolean=false;
  constructor(public employeeService: EmployeeService,private element: ElementRef) { }

  ngOnInit():void{
    this.loadUsers();
    
    //TODO:GET USERID AFTER THEY LOGGED IN
    
    if (localStorage.getItem('id'))
    {
      const id=parseInt(localStorage.getItem('id')|| "0") ;
      this.employeeService.setAuth(id);

    }
    else{
      this.logout();
    }
    



  }
  
  search(term:string){

    if (term.length===0)
    {
      return this.users=this.usersAux;
    }
    return this.employeeService.search(term)
      .subscribe( (users) => {
        this.users= users;
      });  
  }
  
  changeRole(user:Employee)
  {
    this.employeeService.saveEmployee(user)
      .subscribe({
        next: res => Swal.fire('Role uploaded', '', 'success'),
        error: err => Swal.fire('Error',err.error.msg,'error')
      });
    
  }
  updateSalary(user:Employee,salary:string)
  {
    //this.txtSalary.toArray()
    console.log(user.user.emailAddress);
    console.log(salary);  
  }


  deleteUser(user:User){
    const e = this.employeeService.auth;
    console.log(user.userID);
    console.log(e.user);
    
    if (user.userID === this.employeeService.id)
    {
      return Swal.fire('Error','You cannot delete yourself','error');
    } 
    

    
    return Swal.fire({
      title: `Are you sure you want to delete "${user.firstName}"?`,
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteUser(user).subscribe({
          next: () => 
          {
            Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
            );  
            this.loadUsers();
  
          }
          ,
          error: () => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          }) 
        });
      }
    })
    
      
  }

  loadUsers()
  {
    this.loading=true;

    this.employeeService.loadUsers()
    .subscribe( users =>{

    //.subscribe( ({user,role,salary}) =>{
      this.total=users.length;
      this.users=users;
      //this.usersAux=users;
      this.loading=false;
      console.log(users);
      console.log("total="+this.total);
    });
    
    
  }


  openModal(employee:Employee){
    console.log("modal debe estar " + employee.user.firstName);
    this.employeeService.openModal(employee.user);
  }

  logout(){
    this.employeeService.logout();
  }




}
