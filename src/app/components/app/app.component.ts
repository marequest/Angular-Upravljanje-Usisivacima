import { Component } from '@angular/core';
import {ConfigService} from "../../services/config.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'domaci1';

  constructor(
    private configService: ConfigService,
    private router: Router
  ) {

  }

  getUserName(): String{
    return this.configService.getUserName();
  }

  logout() {
    this.configService.removeUserName();
    localStorage.setItem('token', "");
    alert("Logged out")
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    return (this.configService.getUserName().length > 0);
  }

  isLoggedOut(): boolean {
    return (this.configService.getUserName().length == 0);
  }

}
