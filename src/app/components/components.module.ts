import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { SalaryInputComponent } from './salary-input/salary-input.component';

@NgModule({
  declarations: [
    ModalComponent,
    SalaryInputComponent
  ],
  exports: [
    ModalComponent,
    SalaryInputComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
