import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/common/AppConstants';



@Injectable()
export class TaskActionsService {
  redirectUrl: string;
  baseUrl = AppConstants.API_ENDPOINT;
  permissionTypes: any[];

  constructor(private http: HttpClient) {
  }

  doTaskAction(action): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/DoTaskAction`;
    return this.http.post<any>(url, action);
  }

}
