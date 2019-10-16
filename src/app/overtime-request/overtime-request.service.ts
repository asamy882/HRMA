import {Injectable} from '@angular/core';
import { HttpService } from 'src/common/services/http.service';



@Injectable()
export class OvertimeRequestService {

  constructor(private http: HttpService) {
  }

  addOvertimeRequest(data): Promise<any> {
    const url = `/api/Dashboard/AddOvertimeRequest`;
    return this.http.post(url, data);
  }

  getMyOvertimeRequests(): Promise<any> {
    const url = `/api/Dashboard/GetMyOvertimeRequests`;
    return this.http.get(url);
  }

  getOvertimeRequest(requestId): Promise<any> {
    const url = `/api/Dashboard/GetOvertimeRequest?requestId=${requestId}`;
    return this.http.get(url);
  }

}
