import {Injectable} from '@angular/core';
import { HttpService } from 'src/common/services/http.service';



@Injectable()
export class PenaltyRequestService {
  
  constructor(private http: HttpService) {
  }

  getPenaltyReasonPolicyForEmployee(employeeId, reasonId, date): Promise<any> {
    const url = `/api/Dashboard/GetPenaltyReasonPolicyForEmployee?employeeId=${employeeId}&reasonId=${reasonId}&date=${date}`;
    return this.http.get(url);
  }

  getEmployeesForPenaltyRequest(): Promise<any> {
    const url = `/api/Dashboard/GetEmployeesForPenaltyRequest`;
    return this.http.get(url);
  }

  getPenaltyReasons(): Promise<any> {
    const url = `/api/Dashboard/GetPenaltyReasons`;
    return this.http.get(url);
  }

  addPenaltyRequest(data): Promise<any> {
    const url = `/api/Dashboard/AddPenaltyRequest`;
    return this.http.post(url, data);
  }

  getMyPenaltyRequests(): Promise<any> {
    const url = `/api/Dashboard/GetMyPenaltyRequests`;
    return this.http.get(url);
  }

  getPenaltyRequest(requestId): Promise<any> {
    const url = `/api/Dashboard/GetPenaltyRequest?requestId=${requestId}`;
    return this.http.get(url);
  }

}
