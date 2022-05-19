import { Component } from '@angular/core';
import { EmployeeService } from './User/services/employee-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'registration';

  constructor( public employeeService: EmployeeService){}
  
}
