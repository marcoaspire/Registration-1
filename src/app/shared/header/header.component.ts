import { Component, OnInit } from '@angular/core';
import { EmployeesComponent } from 'src/app/User/pages/employees/employees.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {


  constructor(public employeeService:EmployeesComponent) { 
 }

  
 logout(){
  this.employeeService.logout();
 }
}
