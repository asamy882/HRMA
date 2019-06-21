import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConstants } from '../../common/AppConstants';


@Injectable()
export class VacationRequestService {
  redirectUrl: string;
  baseUrl = AppConstants.API_ENDPOINT;
  vacationTypes: any[];

  constructor(private http: HttpClient) {
  }

  loadVacationTypes(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/Dashboard/GetVacationTypes').pipe(map((res: any) => {
      if (res.Success) {
        this.vacationTypes = res.Items;
        localStorage.setItem('vacationTypes', JSON.stringify(res.Items));
      }
    }));
  }

  getVacationTypes() {
    if (this.vacationTypes) {
      return this.vacationTypes;
    } else {
      const vacationTypes = localStorage.getItem('vacationTypes');
      if (vacationTypes) {
        return JSON.parse(vacationTypes);
      }
    }
    return null;
  }


  getVacationTypeBalance(vacationTypeId, fromDate, toDate): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetVacationTypeBalance?VacationTypeId=${vacationTypeId}&FromDate=${fromDate}&ToDate=${toDate}`;
    return this.http.get(url);
  }

  getReplacements(empNo, empName): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetReplacements?empNo=${empNo}&empName=${empName}`;
    return this.http.get(url);
  }

  calculateVacationDays(data): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/CalculateVacationDays`;
    return this.http.post<any>(url, data);
  }

  addVacationRequest(data): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/AddVacationRequest`;
    return this.http.post<any>(url, data);
  }

}
