import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationComponent } from './pages/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    RegistrationComponent,
    LoginComponent
  ]
})
export class UserModule { }
