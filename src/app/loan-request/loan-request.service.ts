import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../common/AppConstants';


@Injectable()
export class LoanRequestService {
  redirectUrl: string;
  baseUrl = AppConstants.API_ENDPOINT;
  loanTypes: any[];

  constructor(private http: HttpClient) {
  }

  addLoanRequest(data): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/AddLoanRequest`;
    return this.http.post<any>(url, data);
  }

  getMyLoanRequests(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetMyLoanRequests`;
    return this.http.get(url);
  }

  getLoanRequest(requestId): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetLoanRequest?requestId=${requestId}`;
    return this.http.get(url);
  }

}
