import {Component, OnInit, ViewChild} from '@angular/core';
import { VacuumService } from "../../services/VacuumService";
import { VacuumItem } from "../../model";
import { Router } from "@angular/router";
import { AuthService } from "../../services/AuthService";
import { WebSocketService } from "../../services/WebSocketService";
import { MatDialog } from "@angular/material/dialog";
import { ScheduleOperationDialogComponent } from "../schedule-operation-dialog/schedule-operation-dialog.component";
import {CustomAlertComponent} from "../custom-alert/custom-alert.component";

@Component({
  selector: 'app-search-vacuums',
  templateUrl: './search-vacuums.component.html',
  styleUrls: ['./search-vacuums.component.css']
})
export class SearchVacuumsComponent implements OnInit {

  vacuumItems: VacuumItem[] = [];
  name: string = "";
  status: string = "ALL";
  dateFrom: string = "";
  dateTo: string = "";

  @ViewChild('customAlert') customAlert!: CustomAlertComponent;


  constructor(public authService: AuthService,
              private vacuumService: VacuumService,
              private router: Router,
              private webSocketService: WebSocketService,
              public dialog: MatDialog) {
    this.loadVacuums();
  }

  ngOnInit(): void {
    this.webSocketService.subscribeToStatusUpdates().subscribe((message: string) => {
      this.loadVacuums();
    });
  }

  loadVacuums() {
    this.vacuumService.getVacuums().subscribe(
      (res: VacuumItem[]) => {
        this.vacuumItems = res;
      },
      error => {
        this.router.navigateByUrl('/home');
      }
    );
  }

  search() {
    const searchParams = {
      name: this.name,
      status: this.status,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo
    };
    this.vacuumService.searchVacuums(searchParams).subscribe(
      (res: VacuumItem[]) => {
        this.vacuumItems = res;
      },
      error => {
        this.customAlert.showAlert(`Failed to search vacuums`, 'danger');
      }
    );
  }

  removeVacuum(usisivacId: number): void {
    this.customAlert.showAlert(`Are you sure you want to remove vacuum ${usisivacId}?`, 'warning', true);
    const subscription = this.customAlert.confirm.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.vacuumService.removeVacuum(usisivacId).subscribe(() => {
          this.vacuumItems = this.vacuumItems.filter(vacuum => vacuum.id !== usisivacId);
          this.customAlert.showAlert(`Vacuum ${usisivacId} Removed`, 'success');
        }, error => {
          this.customAlert.showAlert(`Failed to remove vacuum ${usisivacId}`, 'danger');
        });
      }
      subscription.unsubscribe();
    });
  }

  startVacuum(usisivacId: number): void {
    const vacuum = this.vacuumItems.find(v => v.id === usisivacId);
    if (vacuum && vacuum.status === 'IN_PROGRESS') {
      this.customAlert.showAlert(`Cannot start vacuum ${usisivacId} while it is in progress`, 'info');
      return;
    }
    this.vacuumService.startVacuum(usisivacId).subscribe(
      () => {
        this.customAlert.showAlert(`Vacuum ${usisivacId} Started`, 'success');
      },
      error => {
        this.customAlert.showAlert(`Vacuum ${usisivacId} must be OFF to be STARTED. Please try again later`, 'danger');
      }
    );
  }

  stopVacuum(usisivacId: number): void {
    const vacuum = this.vacuumItems.find(v => v.id === usisivacId);
    if (vacuum && vacuum.status === 'IN_PROGRESS') {
      this.customAlert.showAlert(`Cannot stop vacuum ${usisivacId} while it is in progress`, 'info');
      return;
    }
    this.vacuumService.stopVacuum(usisivacId).subscribe(
      () => {
        this.customAlert.showAlert(`Vacuum ${usisivacId} Stopped`, 'success');
      },
      error => {
        this.customAlert.showAlert(`Vacuum ${usisivacId} must be OFF to be STOPPED. Please try again later`, 'danger');
      }
    );
  }

  dischargeVacuum(usisivacId: number): void {
    const vacuum = this.vacuumItems.find(v => v.id === usisivacId);
    if (vacuum && vacuum.status === 'IN_PROGRESS') {
      this.customAlert.showAlert(`Cannot discharge vacuum ${usisivacId} while it is in progress`, 'info');
      return;
    }
    this.vacuumService.dischargeVacuum(usisivacId).subscribe(
      () => {
        this.customAlert.showAlert(`Vacuum ${usisivacId} Discharged`, 'success');
      },
      error => {
        this.customAlert.showAlert(`Vacuum ${usisivacId} must be OFF to be DISCHARGED. Please try again later`, 'danger');
      }
    );
  }

  scheduleOperation(usisivacId: number): void {
    const dialogRef = this.dialog.open(ScheduleOperationDialogComponent, {
      width: '400px',
      data: { usisivacId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vacuumService.scheduleOperation(usisivacId, result.operation, result.scheduledTime).subscribe(() => {
          this.customAlert.showAlert(`Operation scheduled successfully for vacuum ${usisivacId}`, 'success');
        }, error => {
          this.customAlert.showAlert(`Failed to schedule operation for vacuum ${usisivacId}`, 'danger');
        });
      }
    });
  }
}
