import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../common/AppConstants';


@Injectable()
export class ChangeDayOffRequestService {
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

  addChangeDayOffRequest(data): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/AddChangeDayOffRequest`;
    return this.http.post<any>(url, data);
  }

  getMyChangeDayOffRequests(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetMyChangeDayOffRequests`;
    return this.http.get(url);
  }

  getChangeDayOffRequest(requestId): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetChangeDayOffRequest?requestId=${requestId}`;
    return this.http.get(url);
  }


}
