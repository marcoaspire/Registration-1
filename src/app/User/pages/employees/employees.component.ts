import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Employee, User } from '../../interfaces/interfaces';
import { EmployeeServiceService } from '../../services/employee-service.service';

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

  public users!:Employee[];
  public usersAux!:Employee[];
  public loading:boolean=true;
  public total:number=0;

  constructor(public employeeService: EmployeeServiceService) { }

  async ngOnInit(): Promise<void>{
    this.loadUsers();

    //TODO:GET USERID AFTER THEY LOGGED IN

    //console.log(this.employeeService.id);

  }
  /*
  onSubmit(form: NgForm) {
    this.insertRecord(form);
  }
  */
  
  search(term:string){

    if (term.length===0)
    {
      return this.users=this.usersAux;
    }
    return this.employeeService.search(term)
      .subscribe( (users) => {
        this.users= users;
        console.log("dsaasda");
        
      }
        
      );  
  }
  
  changeRole(user:Employee)
  {
    
    
    this.employeeService.saveEmployee(user)
      .subscribe(console.log);
    
  }

  deleteUser(user:User){
    console.log(user.userID);
    //console.log(this.employeeService.id);
    /*
    if (user.userID === this.employeeService.id)
    {
      return Swal.fire('Error','You cannot delete yourself','error');
    } 
    */
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
      console.log(this.total);
      
      
    });
    
  }


  openModal(employee:Employee){
    console.log("modal debe estar " + employee.user.firstName);
    
    this.employeeService.openModal(employee.user);
  }


}
