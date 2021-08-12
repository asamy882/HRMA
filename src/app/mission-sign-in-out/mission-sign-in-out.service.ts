import {Injectable} from '@angular/core';

import { HttpService } from 'src/common/services/http.service';


@Injectable()
export class MissionSignInOutService {

  constructor(private http: HttpService) {
  }


  addLocationAttendance(data): Promise<any> {
    const url = `/api/Dashboard/AddLocationAttendance`;
    return this.http.post(url, data);
  }


  getMyMissionRequestsForAttendance(): Promise<any> {
    const url = `/api/Dashboard/GetMyMissionRequestsForAttendance`;
    return this.http.get(url);
  }

}
