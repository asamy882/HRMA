import {Injectable} from '@angular/core';
import { HttpService } from 'src/common/services/http.service';



@Injectable()
export class PermissionRequestService {
  private permissionTypes: any[];

  constructor(private http: HttpService) {
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

  loadPermissionTypes(): Promise<any> {
    const url = `/api/Dashboard/GetPermissionTypes`;
    return this.http.get(url);
  }

  addPermissionRequest(data): Promise<any> {
    const url = `/api/Dashboard/AddPermissionRequest`;
    return this.http.post(url, data);
  }

  getMyPermissionRequests(): Promise<any> {
    const url = `/api/Dashboard/GetMyPermissionRequests`;
    return this.http.get(url);
  }

  getPermissionRequest(requestId): Promise<any> {
    const url = `/api/Dashboard/GetPermissionRequest?requestId=${requestId}`;
    return this.http.get(url);
  }


}
