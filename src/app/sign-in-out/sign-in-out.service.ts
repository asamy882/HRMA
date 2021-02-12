import {Injectable} from '@angular/core';

import { HttpService } from 'src/common/services/http.service';


@Injectable()
export class SignInOutService {

  constructor(private http: HttpService) {
  }


  addLocationAttendance(data): Promise<any> {
    const url = `/api/Dashboard/AddLocationAttendance`;
    return this.http.post(url, data);
  }

  getOutsideLocations(): Promise<any> {
    const url = `/api/Dashboard/GetOutsideLocations`;
    return this.http.get(url);
  }

}
