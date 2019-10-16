import {Injectable} from '@angular/core';

import { HttpService } from 'src/common/services/http.service';


@Injectable()
export class MissionRequestService {

  constructor(private http: HttpService) {
  }

  addMissionRequest(data): Promise<any> {
    const url = `/api/Dashboard/AddMissionRequest`;
    return this.http.post(url, data);
  }

  getMyMissionRequests(): Promise<any> {
    const url = `/api/Dashboard/GetMyMissionRequests`;
    return this.http.get(url);
  }

  getMissionRequest(requestId): Promise<any> {
    const url = `/api/Dashboard/GetMissionRequest?requestId=${requestId}`;
    return this.http.get(url);
  }

}
