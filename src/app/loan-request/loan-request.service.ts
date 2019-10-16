import {Injectable} from '@angular/core';
import { HttpService } from 'src/common/services/http.service';


@Injectable()
export class LoanRequestService {

  constructor(private http: HttpService) {
  }

  addLoanRequest(data): Promise<any> {
    const url = `/api/Dashboard/AddLoanRequest`;
    return this.http.post(url, data);
  }

  getMyLoanRequests(): Promise<any> {
    const url = `/api/Dashboard/GetMyLoanRequests`;
    return this.http.get(url);
  }

  getLoanRequest(requestId): Promise<any> {
    const url = `/api/Dashboard/GetLoanRequest?requestId=${requestId}`;
    return this.http.get(url);
  }

}
