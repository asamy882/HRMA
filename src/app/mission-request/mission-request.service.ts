import {Injectable} from '@angular/core';

import { HttpService } from 'src/common/services/http.service';


@Injectable()
export class MissionRequestService {
  private missionTypes: any[];
  private missionDistances: any[];

  constructor(private http: HttpService) {
  }

  loadMissionTypes(): Promise<any> {
    const url = '/api/Dashboard/GetMissionTypes';
    return this.http.get(url);
  }

  getMissionTypes() {
    if (this.missionTypes) {
      return this.missionTypes;
    } else {
      const missionTypes = localStorage.getItem('missionTypes');
      if (missionTypes) {
        return JSON.parse(missionTypes);
      }
    }
    return null;
  }

  loadMissionDistances(): Promise<any> {
    const url = '/api/Dashboard/GetMissionDistances';
    return this.http.get(url);
  }

  getMissionDistances() {
    if (this.missionDistances) {
      return this.missionDistances;
    } else {
      const missionDistances = localStorage.getItem('missionDistances');
      if (missionDistances) {
        return JSON.parse(missionDistances);
      }
    }
    return null;
  }


  addMissionRequest(data): Promise<any> {
    const url = `/api/Dashboard/AddMissionRequest`;
    return this.http.post(url, data);
  }

  getDayShift(date): Promise<any> {
    const url = '/api/Dashboard/GetDayShift?date='+date;
    return this.http.get(url);
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
