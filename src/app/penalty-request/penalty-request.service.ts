import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../common/AppConstants';


@Injectable()
export class PenaltyRequestService {
  redirectUrl: string;
  baseUrl = AppConstants.API_ENDPOINT;


  constructor(private http: HttpClient) {
  }

  getPenaltyReasonPolicyForEmployee(employeeId, reasonId, date): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetPenaltyReasonPolicyForEmployee?employeeId=${employeeId}&reasonId=${reasonId}&date=${date}`;
    return this.http.get(url);
  }

  getEmployeesForPenaltyRequest(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetEmployeesForPenaltyRequest`;
    return this.http.get(url);
  }

  getPenaltyReasons(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetPenaltyReasons`;
    return this.http.get(url);
  }

  addPenaltyRequest(data): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/AddPenaltyRequest`;
    return this.http.post<any>(url, data);
  }

  getMyPenaltyRequests(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetMyPenaltyRequests`;
    return this.http.get(url);
  }

  getPenaltyRequest(requestId): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetPenaltyRequest?requestId=${requestId}`;
    return this.http.get(url);
  }

}
