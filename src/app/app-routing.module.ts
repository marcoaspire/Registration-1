import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './User/pages/registration/registration.component';
import { LoginComponent } from './User/pages/login/login.component';
import { EmployeesComponent } from './User/pages/employees/employees.component';

const routes: Routes = [
  {
    path: '',
    component:RegistrationComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'employees',
    component:EmployeesComponent
  },
  {
    path: '**',
    redirectTo: ''
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
