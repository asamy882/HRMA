import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../common/AppConstants';


@Injectable()
export class OvertimeRequestService {
  redirectUrl: string;
  baseUrl = AppConstants.API_ENDPOINT;
  overtimeTypes: any[];

  constructor(private http: HttpClient) {
  }

  addOvertimeRequest(data): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/AddOvertimeRequest`;
    return this.http.post<any>(url, data);
  }

  getMyOvertimeRequests(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetMyOvertimeRequests`;
    return this.http.get(url);
  }

  getOvertimeRequest(requestId): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetOvertimeRequest?requestId=${requestId}`;
    return this.http.get(url);
  }

}
