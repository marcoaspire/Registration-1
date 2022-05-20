import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './User/pages/registration/registration.component';
import { LoginComponent } from './User/pages/login/login.component';
import { EmployeesComponent } from './User/pages/employees/employees.component';
import { ValidationGuard } from './guards/validation.guard';

const routes: Routes = [
  
  {
    path: '',
    component:LoginComponent
  },
  {
    path: 'reg',
    component:RegistrationComponent
  },
  {
    path: 'employees',
    component:EmployeesComponent,
    //canActivate: [ValidationGuard],
    //canLoad: [ValidationGuard]
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
