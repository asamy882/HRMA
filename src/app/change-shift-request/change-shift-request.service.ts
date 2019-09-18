import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../common/AppConstants';


@Injectable()
export class ChangeShiftRequestService {
  redirectUrl: string;
  baseUrl = AppConstants.API_ENDPOINT;


  constructor(private http: HttpClient) {
  }

  getEmployeeShifts(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetEmployeeShiftsForChangeShift`;
    return this.http.get(url);
  }

  addChangeShiftRequest(data): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/AddChangeShiftRequest`;
    return this.http.post<any>(url, data);
  }

  getMyChangeShiftRequests(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetMyChangeShiftRequests`;
    return this.http.get(url);
  }

  getChangeShiftRequest(requestId): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetChangeShiftRequest?requestId=${requestId}`;
    return this.http.get(url);
  }


}
