import {Injectable} from '@angular/core';
import { HttpService } from 'src/common/services/http.service';



@Injectable()
export class MyShiftScheduleService {
 
  constructor(private http: HttpService) {
  }

  getMyShiftSchedule(): Promise<any> {
    const url = `/api/Dashboard/GetMyShiftSchedule`;
    return this.http.get(url);
  }


}
