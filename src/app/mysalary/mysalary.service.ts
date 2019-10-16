import {Injectable} from '@angular/core';
import { HttpService } from 'src/common/services/http.service';


@Injectable()
export class MySalaryService {

  constructor(private http: HttpService) {
  }

  getPayrollPeriods(): Promise<any> {
    const url = `/api/Dashboard/GetPayrollPeriods`;
    return this.http.get(url);
  }

  getMonthlyPayroll(periodId): Promise<any> {
    const url = `/api/Dashboard/GetMonthlyPayroll?periodId=${periodId}`;
    return this.http.get(url);
  }


}
