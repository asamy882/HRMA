import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../common/AppConstants';
import { HttpService } from 'src/common/services/http.service';


@Injectable()
export class VacationRequestService {
  private vacationTypes: any[];
  baseUrl = AppConstants.API_ENDPOINT;

  constructor(private http: HttpService, private httpClient: HttpClient) {
  }

  loadVacationTypes(): Promise<any> {
    const url = '/api/Dashboard/GetVacationTypes';
    return this.http.get(url);
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


  getVacationTypeBalance(vacationTypeId, fromDate, toDate): Promise<any> {
    const url = `/api/Dashboard/GetVacationTypeBalance?VacationTypeId=${vacationTypeId}&FromDate=${fromDate}&ToDate=${toDate}`;
    return this.http.get(url);
  }

  getReplacements(empNo, empName): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetReplacements?empNo=${empNo}&empName=${empName}`;
    return this.httpClient.get(url);
  }

  calculateVacationDays(data): Promise<any> {
    const url = `/api/Dashboard/CalculateVacationDays`;
    return this.http.post(url, data, false);
  }

  addVacationRequest(data): Promise<any> {
    const url = `/api/Dashboard/AddVacationRequest`;
    return this.http.post(url, data);
  }

  getMyVacationRequests(): Promise<any> {
    const url = `/api/Dashboard/GetMyVacationRequests`;
    return this.http.get(url);
  }

  getVacationRequest(requestId): Promise<any> {
    const url = `/api/Dashboard/GetVacationRequest?requestId=${requestId}`;
    return this.http.get(url);
  }



}
