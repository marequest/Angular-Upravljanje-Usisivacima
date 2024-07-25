import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-operation-dialog',
  templateUrl: './schedule-operation-dialog.component.html',
  styleUrls: ['./schedule-operation-dialog.component.css']
})
export class ScheduleOperationDialogComponent {
  scheduleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ScheduleOperationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.scheduleForm = this.fb.group({
      operation: ['', Validators.required],
      scheduledDate: ['', Validators.required],
      scheduledTime: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.scheduleForm.valid) {
      const scheduledDate = this.scheduleForm.get('scheduledDate')?.value;
      const scheduledTime = this.scheduleForm.get('scheduledTime')?.value;
      const [hours, minutes] = scheduledTime.split(':');

      const scheduledDateTime = new Date(scheduledDate);
      scheduledDateTime.setHours(hours, minutes, 0, 0);

      if (isNaN(scheduledDateTime.getTime())) {
        console.error('Invalid date or time:', scheduledDateTime);
        return;
      }

      this.dialogRef.close({
        operation: this.scheduleForm.get('operation')?.value,
        scheduledTime: scheduledDateTime.toISOString() // Convert to ISO string
      });
    }
  }
}
