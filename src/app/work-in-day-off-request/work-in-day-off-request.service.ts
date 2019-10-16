import {Injectable} from '@angular/core';

import { HttpService } from 'src/common/services/http.service';


@Injectable()
export class WorkinDayOffRequestService {


  constructor(private http: HttpService) {
  }

  getEmployeeDayOffs(): Promise<any> {
    const url = `/api/Dashboard/GetEmployeeDayOffs`;
    return this.http.get(url);
  }

  getEmployeeShifts(): Promise<any> {
    const url = `/api/Dashboard/GetEmployeeShifts`;
    return this.http.get(url);
  }

  addWorkinDayOffRequest(data): Promise<any> {
    const url = `/api/Dashboard/AddWorkinDayOffRequest`;
    return this.http.post(url, data);
  }

  getMyWorkinDayOffRequests(): Promise<any> {
    const url = `/api/Dashboard/GetMyWorkinDayOffRequests`;
    return this.http.get(url);
  }

  getWorkinDayOffRequest(requestId): Promise<any> {
    const url = `/api/Dashboard/GetWorkinDayOffRequest?requestId=${requestId}`;
    return this.http.get(url);
  }


}
