import {Injectable} from '@angular/core';
import { HttpService } from 'src/common/services/http.service';




@Injectable()
export class TaskActionsService {

  constructor(private http: HttpService) {
  }

  doTaskAction(action): Promise<any> {
    const url = `/api/Dashboard/DoTaskAction`;
    return this.http.post(url, action);
  }

}
