import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {newauthGuard} from "./guards/newauth.guard";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {AddUserComponent} from "./components/add-user/add-user.component";
import {EditUserComponent} from "./components/edit-user/edit-user.component";
import {loginauthGuard} from "./guards/loginauth.guard";
import {CreateUserComponent} from "./components/create-user/create-user.component";
import {PermissionGuard} from "./guards/PermissionGuard";
import {AddVacuumsComponent} from "./components/add-vacuums/add-vacuums.component";
import {SearchVacuumsComponent} from "./components/search-vacuums/search-vacuums.component";
import {ErrorHistoryComponent} from "./components/error-history/error-history.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [newauthGuard],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [loginauthGuard]
  },
  {
    path: "create-user",
    component: CreateUserComponent,
    canActivate: [newauthGuard, PermissionGuard],
    data: { requiredPermission: 'can_create_users' }
  },
  {
    path: "edit-user/:id",
    component: EditUserComponent,
    canActivate: [newauthGuard, PermissionGuard],
    data: { requiredPermission: 'can_update_users' }
  },
  {
    path: "add-vacuum",
    component: AddVacuumsComponent,
    canActivate: [newauthGuard],
  },
  {
    path: "search-vacuums",
    component: SearchVacuumsComponent,
    canActivate: [newauthGuard],
  },
  {
    path: "error-history",
    component: ErrorHistoryComponent,
    canActivate: [newauthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
