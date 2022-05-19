import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserModule } from './User/user.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CustomIfDirective } from './directives/custom-if.directive';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CustomIfDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UserModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
