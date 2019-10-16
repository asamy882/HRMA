import {Injectable} from '@angular/core';

import { HttpService } from 'src/common/services/http.service';


@Injectable()
export class ChangeShiftRequestService {

  constructor(private http: HttpService) {
  }

  getEmployeeShifts(): Promise<any> {
    const url = `/api/Dashboard/GetEmployeeShiftsForChangeShift`;
    return this.http.get(url);
  }

  addChangeShiftRequest(data): Promise<any> {
    const url = `/api/Dashboard/AddChangeShiftRequest`;
    return this.http.post(url, data);
  }

  getMyChangeShiftRequests(): Promise<any> {
    const url = `/api/Dashboard/GetMyChangeShiftRequests`;
    return this.http.get(url);
  }

  getChangeShiftRequest(requestId): Promise<any> {
    const url = `/api/Dashboard/GetChangeShiftRequest?requestId=${requestId}`;
    return this.http.get(url);
  }


}
