import {Injectable} from '@angular/core';
import { HttpService } from 'src/common/services/http.service';



@Injectable()
export class ChangeDayOffRequestService {


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

  addChangeDayOffRequest(data): Promise<any> {
    const url = `/api/Dashboard/AddChangeDayOffRequest`;
    return this.http.post(url, data);
  }

  getMyChangeDayOffRequests(): Promise<any> {
    const url = `/api/Dashboard/GetMyChangeDayOffRequests`;
    return this.http.get(url);
  }

  getChangeDayOffRequest(requestId): Promise<any> {
    const url = `/api/Dashboard/GetChangeDayOffRequest?requestId=${requestId}`;
    return this.http.get(url);
  }


}
