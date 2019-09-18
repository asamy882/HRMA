import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../common/AppConstants';


@Injectable()
export class PermissionRequestService {
  redirectUrl: string;
  baseUrl = AppConstants.API_ENDPOINT;
  permissionTypes: any[];

  constructor(private http: HttpClient) {
  }

  getPermissionTypes() {
    if (this.permissionTypes) {
      return this.permissionTypes;
    } else {
      const permissionTypes = localStorage.getItem('permissionTypes');
      if (permissionTypes) {
        return JSON.parse(permissionTypes);
      }
    }
    return null;
  }

  loadPermissionTypes(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/Dashboard/GetPermissionTypes').pipe(map((res: any) => {
      if (res.Success) {
        this.permissionTypes = res.Items;
        localStorage.setItem('permissionTypes', JSON.stringify(res.Items));
      }
    }));
  }

  addPermissionRequest(data): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/AddPermissionRequest`;
    return this.http.post<any>(url, data);
  }

  getMyPermissionRequests(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetMyPermissionRequests`;
    return this.http.get(url);
  }

  getPermissionRequest(requestId): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetPermissionRequest?requestId=${requestId}`;
    return this.http.get(url);
  }


}
