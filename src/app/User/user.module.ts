import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationComponent } from './pages/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule

  ],
  exports:[
    RegistrationComponent,
    LoginComponent
  ]
})
export class UserModule { }
