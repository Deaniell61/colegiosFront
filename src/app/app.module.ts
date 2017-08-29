import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from './app.routing';
import { AuthGuard } from "./_guards/auth.guard";
import { HomeGuard } from "./_guards/home.guard";

import { AuthService } from "./_services/auth.service";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { SimpleNotificationsModule } from 'angular2-notifications';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    HomeGuard,
    AuthService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
