import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'danger' | 'info' | 'warning' = 'info';
  @Input() showConfirm: boolean = false;

  @Output() confirm: EventEmitter<boolean> = new EventEmitter();

  show: boolean = false;

  ngOnInit(): void {}

  showAlert(message: string, type: 'success' | 'danger' | 'info' | 'warning' = 'info', showConfirm: boolean = false): void {
    this.message = message;
    this.type = type;
    this.showConfirm = showConfirm;
    this.show = true;
  }

  closeAlert(): void {
    this.show = false;
  }

  onConfirm(): void {
    this.confirm.emit(true);
    this.closeAlert();
  }

  onCancel(): void {
    this.confirm.emit(false);
    this.closeAlert();
  }


}
