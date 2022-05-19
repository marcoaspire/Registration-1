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
  @Input('user') user!: any;

  @Output() onNewSalary = new EventEmitter<number>();

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {    
  }

  updateSalary(user:Employee,salary:string)
  {  
    try {
      var s = parseFloat(salary);
      if (s>0 && s != user.salary )
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
        Swal.fire('Error','Salary must be a number greater than 0','error')
        this.onNewSalary.emit(s);
      }
    } catch (error:any) {
      Swal.fire('Error',error,'error')
    }
  }
}
