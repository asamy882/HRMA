import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConstants } from '../../common/AppConstants';


@Injectable()
export class MyTasksService {
  redirectUrl: string;
  baseUrl = AppConstants.API_ENDPOINT;


  constructor(private http: HttpClient) {
  }

  getMyTasks(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetMyTasks`;
    return this.http.get(url);
  }


}
