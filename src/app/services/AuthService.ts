import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, shareReplay} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {UserItem} from "../model";
import { ChangeDetectorRef } from '@angular/core';


export interface User {
  username: string,
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser = {} as UserItem;
  userPermissions: string[] = [];

  constructor(private http: HttpClient) {
    this.loadUser()
  }

  login(username:string, password:string ) {
    return this.http
      .post<any>('http://localhost:8080/auth/login', {username, password})
  }

  public setSession(authResult: any) {
    localStorage.setItem('token', authResult.jwt);
    this.loadUser()
  }

  loadUser() {
    let temp = localStorage.getItem("token");
    if(temp != null && temp.length > 0) {
      this.loadUserDataFromToken(temp)
    }
  }

  private loadUserDataFromToken(token: string) {
    if (token) {
      const decodedToken: any = jwtDecode(token);

      this.fetchUserDataFromAPI(decodedToken.userId).subscribe(res => {
        this.loggedUser = res;
        this.userPermissions = res.permissions;
        // TODO JWT claims
      }, error => {
        this.userPermissions = []
      });
    }
  }

  private fetchUserDataFromAPI(userId: number): Observable<any>{
    return this.http.get('http://localhost:8080/api/users/' + userId);
  }

}
