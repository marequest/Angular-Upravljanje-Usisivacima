import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserItem } from "../../model";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/UserService";
import {CustomAlertComponent} from "../custom-alert/custom-alert.component";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @ViewChild('customAlert') customAlert!: CustomAlertComponent;

  userForm: FormGroup;
  userId: number = -1;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required]],
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

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.userService.getUser(this.userId).subscribe((res: UserItem) => {
        this.userForm.patchValue({
          firstName: res.firstName,
          lastName: res.lastName,
          username: res.username
        });
        this.setPermissions(res.permissions);
      });
    });
  }

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.userId = params['id'];
    //   this.userService.getUser(this.userId).subscribe((res: UserItem) => {
    //     this.userForm.patchValue({
    //       firstName: res.firstName,
    //       lastName: res.lastName,
    //       username: res.username
    //     });
    //     this.setPermissions(res.permissions);
    //   });
    // });
  }

  setPermissions(permissionsString: string) {
    const permissionsArray = permissionsString.split(',');
    permissionsArray.forEach(permission => {
      const control = this.userForm.get(permission.trim());
      if (control) {
        control.setValue(true);
      }
    });
  }

  submitEdit() {
    if (this.userForm.valid) {

      const editedUser = { ...this.userForm.value, userId: this.userId };
      editedUser.permissions = this.parsePermissionsBackwards();
      console.log(editedUser)
      this.userService.updateUser(editedUser).subscribe((res: UserItem) => {
        this.router.navigateByUrl('/');
      }, error => {
        this.customAlert.showAlert(`Failed to create user`, 'danger');
      });
    } else {
      this.customAlert.showAlert(`Please fill all required fields correctly`, 'info');
    }
  }

  parsePermissionsBackwards(): string {
    const permissions = [];
    for (const permission in this.userForm.controls) {
      if (this.userForm.get(permission)?.value) {
        permissions.push(permission);
      }
    }
    return permissions.join(',');
  }
}
