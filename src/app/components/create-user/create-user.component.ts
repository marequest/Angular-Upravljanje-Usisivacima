import {Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/UserService";
import { UserItem } from "../../model";
import { Router } from "@angular/router";
import { AuthService } from "../../services/AuthService";
import {CustomAlertComponent} from "../custom-alert/custom-alert.component";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  @ViewChild('customAlert') customAlert!: CustomAlertComponent;

  userForm: FormGroup;

  // Permissions
  can_read_users: boolean = false;
  can_create_users: boolean = false;
  can_update_users: boolean = false;
  can_delete_users: boolean = false;
  can_search_vacuum: boolean = false;
  can_start_vacuum: boolean = false;
  can_stop_vacuum: boolean = false;
  can_discharge_vacuum: boolean = false;
  can_add_vacuum: boolean = false;
  can_remove_vacuums: boolean = false;
  can_schedule_vacuum: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      can_read_users: [false],
      can_create_users: [false],
      can_update_users: [false],
      can_delete_users: [false],
      can_search_vacuum: [false],
      can_start_vacuum: [false],
      can_stop_vacuum: [false],
      can_discharge_vacuum: [false],
      can_add_vacuum: [false],
      can_remove_vacuums: [false],
      can_schedule_vacuum: [false]
    });
  }

  submitCreateUser() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      newUser.permissions = this.parsePermissionsBackwards();
      this.userService.createUser(newUser).subscribe((res: UserItem) => {
        this.router.navigateByUrl('/');
      }, error => {
        this.customAlert.showAlert(`Failed to edit user`, 'danger');
      });
    } else {
      this.customAlert.showAlert(`Please fill all required fields correctly`, 'info');
    }
  }

  parsePermissionsBackwards(): string {
    let temp: string = "";

    if (this.userForm.get('can_read_users')?.value) temp += "can_read_users,";
    if (this.userForm.get('can_create_users')?.value) temp += "can_create_users,";
    if (this.userForm.get('can_update_users')?.value) temp += "can_update_users,";
    if (this.userForm.get('can_delete_users')?.value) temp += "can_delete_users,";
    if (this.userForm.get('can_search_vacuum')?.value) temp += "can_search_vacuum,";
    if (this.userForm.get('can_start_vacuum')?.value) temp += "can_start_vacuum,";
    if (this.userForm.get('can_stop_vacuum')?.value) temp += "can_stop_vacuum,";
    if (this.userForm.get('can_discharge_vacuum')?.value) temp += "can_discharge_vacuum,";
    if (this.userForm.get('can_add_vacuum')?.value) temp += "can_add_vacuum,";
    if (this.userForm.get('can_remove_vacuums')?.value) temp += "can_remove_vacuums,";
    if (this.userForm.get('can_schedule_vacuum')?.value) temp += "can_schedule_vacuum,";

    if (temp.length > 0) {
      temp = temp.slice(0, -1);
    }
    return temp;
  }
}
