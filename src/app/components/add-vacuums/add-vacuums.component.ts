import {Component, ViewChild} from '@angular/core';
import { AuthService } from "../../services/AuthService";
import { VacuumService } from "../../services/VacuumService";
import { Router } from "@angular/router";
import { VacuumItem } from "../../model";
import { NgForm } from '@angular/forms';
import {CustomAlertComponent} from "../custom-alert/custom-alert.component";

@Component({
  selector: 'app-add-vacuums',
  templateUrl: './add-vacuums.component.html',
  styleUrls: ['./add-vacuums.component.css']
})
export class AddVacuumsComponent {

  @ViewChild('customAlert') customAlert!: CustomAlertComponent;


  name: string = "";

  constructor(
    public authService: AuthService,
    private vacuumService: VacuumService,
    private router: Router
  ) {}

  addVacuum(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.customAlert.showAlert(`Are you sure you want to add vacuum ${this.name}?`, 'warning', true);
    const subscription = this.customAlert.confirm.subscribe((confirmed: boolean) => {
      this.vacuumService.addVacuum(this.name).subscribe((res: VacuumItem) => {
        this.customAlert.showAlert(`Vacuum ${this.name} added successfully`, 'success');
        this.router.navigateByUrl('/search-vacuums');
      }, error => {
        this.customAlert.showAlert(`Failed to add vacuum`, 'danger');
      });
      subscription.unsubscribe();
    });
    // if (confirm(`Are you sure you want to add vacuum: ${this.name}?`)) {
    //   this.vacuumService.addVacuum(this.name).subscribe((res: VacuumItem) => {
    //     this.customAlert.showAlert(`Vacuum ${this.name} added successfully`, 'success');
    //     this.router.navigateByUrl('/search-vacuums');
    //   }, error => {
    //     this.customAlert.showAlert(`Failed to add vacuum`, 'danger');
    //   });
    // }
  }
}
