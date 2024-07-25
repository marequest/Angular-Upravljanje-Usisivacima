import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {AuthInterceptor} from "./auth.interceptor";
import { CreateUserComponent } from './components/create-user/create-user.component';
import { SearchVacuumsComponent } from './components/search-vacuums/search-vacuums.component';
import { AddVacuumsComponent } from './components/add-vacuums/add-vacuums.component';
import { ErrorHistoryComponent } from './components/error-history/error-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleOperationDialogComponent } from './components/schedule-operation-dialog/schedule-operation-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import { CustomAlertComponent } from './components/custom-alert/custom-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AddUserComponent,
    EditUserComponent,
    CreateUserComponent,
    SearchVacuumsComponent,
    AddVacuumsComponent,
    ErrorHistoryComponent,
    ScheduleOperationDialogComponent,
    CustomAlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatNativeDateModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
