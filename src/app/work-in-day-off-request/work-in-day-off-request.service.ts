import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../common/AppConstants';


@Injectable()
export class WorkinDayOffRequestService {
  redirectUrl: string;
  baseUrl = AppConstants.API_ENDPOINT;


  constructor(private http: HttpClient) {
  }

  getEmployeeDayOffs(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetEmployeeDayOffs`;
    return this.http.get(url);
  }

  getEmployeeShifts(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetEmployeeShifts`;
    return this.http.get(url);
  }

  addWorkinDayOffRequest(data): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/AddWorkinDayOffRequest`;
    return this.http.post<any>(url, data);
  }

  getMyWorkinDayOffRequests(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetMyWorkinDayOffRequests`;
    return this.http.get(url);
  }

  getWorkinDayOffRequest(requestId): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetWorkinDayOffRequest?requestId=${requestId}`;
    return this.http.get(url);
  }


}
