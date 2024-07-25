import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfigService} from "../../services/config.service";
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../services/UserService";
import {UserItem} from "../../model";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../services/AuthService";
import {CustomAlertComponent} from "../custom-alert/custom-alert.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  @ViewChild('customAlert') customAlert!: CustomAlertComponent;


  userItems: UserItem[] = [];
  canReadUsers: boolean = false;


  constructor(
    private configService: ConfigService,
    public authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.loadUsers().subscribe((res : UserItem[]) => {
      this.userItems = res;
    }, error => {
      this.router.navigateByUrl('/login');
    });
  }


  loadUsers(): Observable<any> {
    return this.userService.getUsers()
  }


  setSelected(user: UserItem) {
    const navigationExtras = {
      state: {
        user: user
      }
    }
    this.router.navigateByUrl(`/edit-user/${user.userId}`, navigationExtras);
  }

  createUser() {
    this.router.navigateByUrl(`/create-user`);
  }

  deleteUser(userId: number) {
    this.customAlert.showAlert(`Are you sure you want to delete user ${userId}?`, 'warning', true);
    const subscription = this.customAlert.confirm.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userService.deleteUser(userId).subscribe(() => {
          this.userItems = this.userItems.filter(user => user.userId !== userId);
          this.customAlert.showAlert("User " + userId + " has been deleted", 'success');
        },
        error => {
          this.customAlert.showAlert("Failed to delete user " + userId + "", 'danger');
        });
      }
      subscription.unsubscribe();
    });
  }
}
