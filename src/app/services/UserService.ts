import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserItem} from "../model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers() : Observable<any> {
    return this.http.get('http://localhost:8080/api/users/all');
  }

  getUser(id: number) :Observable<any> {
    return this.http.get('http://localhost:8080/api/users/' + id);
  }

  updateUser(user: UserItem): Observable<any> {
    return this.http.put('http://localhost:8080/api/users', user);
  }

  createUser(user: UserItem): Observable<any> {
    return this.http.post('http://localhost:8080/api/users', user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete('http://localhost:8080/api/users/' + userId);
  }
}
