import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ErrorMessage} from "../model";

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private apiUrl = 'http://localhost:8080/api/errors';

  constructor(private http: HttpClient) {}

  getErrorMessages(): Observable<ErrorMessage[]> {
    return this.http.get<ErrorMessage[]>(this.apiUrl);
  }
}
