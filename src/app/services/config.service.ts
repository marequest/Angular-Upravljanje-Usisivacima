import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private username: string;

  constructor() {
    if (localStorage.hasOwnProperty("username")) {
      this.username = localStorage.getItem("username")!
    } else {
      this.username = '';
    }
  }

  setUserName(username: string): void {
    this.username = username;
    localStorage.setItem('username', this.username);
  }

  getUserName(): string {
    return this.username;
  }

  removeUserName() {
    this.username = "";
  }
}
