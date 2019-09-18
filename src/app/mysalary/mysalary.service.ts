import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../common/AppConstants';


@Injectable()
export class MySalaryService {
  baseUrl = AppConstants.API_ENDPOINT;

  constructor(private http: HttpClient) {
  }

  getPayrollPeriods(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetPayrollPeriods`;
    return this.http.get(url);
  }

  getMonthlyPayroll(periodId): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetMonthlyPayroll?periodId=${periodId}`;
    return this.http.get(url);
  }


}
