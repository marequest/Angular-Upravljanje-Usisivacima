import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/AuthService";
import {ErrorMessage} from "../../model";
import {ErrorMessageService} from "../../services/ErrorMessageService";

@Component({
  selector: 'app-error-history',
  templateUrl: './error-history.component.html',
  styleUrls: ['./error-history.component.css']
})
export class ErrorHistoryComponent implements OnInit{
  errorMessages: ErrorMessage[] = [];

  constructor(private errorMessageService: ErrorMessageService, private authService: AuthService) {}

  ngOnInit() {
    this.loadErrorMessages();
  }

  loadErrorMessages() {
    this.errorMessageService.getErrorMessages().subscribe(
      (res: ErrorMessage[]) => {
        this.errorMessages = res;
      },
      error => {
        console.error('Failed to load error messages', error);
      }
    );
  }
}
