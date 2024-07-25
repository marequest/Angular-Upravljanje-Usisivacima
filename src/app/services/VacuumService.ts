import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {UserItem, VacuumItem} from "../model";

@Injectable({
  providedIn: 'root'
})
export class VacuumService {

  private apiUrl = 'http://localhost:8080/usisivaci';

  constructor(private http: HttpClient) { }

  getVacuums(): Observable<VacuumItem[]> {
    return this.http.get<VacuumItem[]>(this.apiUrl);
  }

  searchVacuums(params: any): Observable<VacuumItem[]> {
    let queryParams = new HttpParams();
    if (params.name) {
      queryParams = queryParams.append('name', params.name);
    }
    if (params.status && params.status !== 'ALL') {
      queryParams = queryParams.append('status', params.status);
    }
    if (params.dateFrom) {
      queryParams = queryParams.append('dateFrom', params.dateFrom);
    }
    if (params.dateTo) {
      queryParams = queryParams.append('dateTo', params.dateTo);
    }
    return this.http.get<VacuumItem[]>(`${this.apiUrl}/search`, { params: queryParams });
  }

  removeVacuum(usisivacId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${usisivacId}`);
  }

  addVacuum(name: string): Observable<VacuumItem> {
    const vacuum = { name, status: 'OFF', active: true };
    return this.http.post<VacuumItem>(this.apiUrl, vacuum);
  }

  startVacuum(usisivacId: number): Observable<VacuumItem> {
    return this.http.put<VacuumItem>(`${this.apiUrl}/${usisivacId}/start`, {});
  }

  stopVacuum(usisivacId: number): Observable<VacuumItem> {
    return this.http.put<VacuumItem>(`${this.apiUrl}/${usisivacId}/stop`, {}).pipe(
      catchError((error) => { return throwError(error); })
    );
  }

  dischargeVacuum(usisivacId: number): Observable<VacuumItem> {
    return this.http.put<VacuumItem>(`${this.apiUrl}/${usisivacId}/discharge`, {});
  }

  scheduleOperation(usisivacId: number, operation: string, scheduledTime: Date): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${usisivacId}/schedule`, {
      operation,
      scheduledTime
    });
  }

}
