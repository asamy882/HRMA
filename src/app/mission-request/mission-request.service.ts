import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../common/AppConstants';


@Injectable()
export class MissionRequestService {
  redirectUrl: string;
  baseUrl = AppConstants.API_ENDPOINT;
  missionTypes: any[];

  constructor(private http: HttpClient) {
  }

  addMissionRequest(data): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/AddMissionRequest`;
    return this.http.post<any>(url, data);
  }

  getMyMissionRequests(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetMyMissionRequests`;
    return this.http.get(url);
  }


}
