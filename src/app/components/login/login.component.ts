import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfigService } from "../../services/config.service";
import { Router } from "@angular/router";
import { AuthService } from "../../services/AuthService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  tokenForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private configService: ConfigService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.tokenForm = this.formBuilder.group({
      username: [configService.getUserName(), [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.username = configService.getUserName();
    this.password = '';
  }

  login() {
    this.configService.setUserName(this.username);
    if (this.tokenForm.valid) {
      this.authService.login(this.username, this.password)
        .subscribe(
          (res) => {
            console.log("User is logged in");
            this.router.navigateByUrl('/');
            this.authService.setSession(res);
            this.loginError = false;
          },
          (error) => {
            console.error("Login failed", error);
            this.loginError = true;
          }
        );
    }
  }
}
