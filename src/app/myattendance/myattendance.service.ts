import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../common/AppConstants';


@Injectable()
export class MyAttendanceService {
  baseUrl = AppConstants.API_ENDPOINT;

  constructor(private http: HttpClient) {
  }

  getAttendanceSheet(fromDate, toDate): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetAttendanceSheet?fromDate=${fromDate}&toDate=${toDate}`;
    return this.http.get(url);
  }


}
