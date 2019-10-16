import {Injectable} from '@angular/core';
import { HttpService } from 'src/common/services/http.service';



@Injectable()
export class MyAttendanceService {

  constructor(private http: HttpService) {
  }

  getAttendanceSheet(fromDate, toDate): Promise<any> {
    const url = `/api/Dashboard/GetAttendanceSheet?fromDate=${fromDate}&toDate=${toDate}`;
    return this.http.get(url);
  }


}
