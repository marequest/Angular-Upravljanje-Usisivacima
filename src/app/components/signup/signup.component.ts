import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  name: string = '';
  surname: string = '';
  username: string = '';
  password: string = '';
  can_read_users: boolean = false;
  can_create_users: boolean = false;
  can_update_users: boolean = false;
  can_delete_users: boolean = false;

  test: string = '';

  constructor() {

  }

  submitSignUp() {
    console.log(this.name + this.surname + this.username + this.password);
  }

}
