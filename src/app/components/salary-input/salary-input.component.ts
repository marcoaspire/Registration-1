import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Employee } from 'src/app/User/interfaces/interfaces';
import { EmployeeService } from 'src/app/User/services/employee-service.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-salary-input',
  templateUrl: './salary-input.component.html',
  styles: [
  ]
})
export class SalaryInputComponent implements OnInit {
  @Input('user') user!: Employee;
  

  @Output() onNewSalary = new EventEmitter<number>();

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {    
  }

  updateSalary(user:Employee,salary:string)
  { 
    let errorMessage="Salary must be a number greater than 0"; 
    try {
      var s = parseFloat(salary);
      if (s == user.salary)
      return;
      if (s>0 && s<1000000)
      {
        user.salary=s;
        this.employeeService.saveEmployee(user)
        .subscribe({
          next: res => {
            Swal.fire('Salary uploaded', '', 'success');
            this.onNewSalary.emit(s);

        },
          error: err => Swal.fire('Error',err.error.msg,'error')
        });
      }
      else{
        if (s>1000000){
          errorMessage="Salary must be less than one million"
        }
        Swal.fire('Error',errorMessage,'error')
        this.onNewSalary.emit(s);
      }
    } catch (error:any) {
      Swal.fire('Error',error,'error')
    }
  }
}
