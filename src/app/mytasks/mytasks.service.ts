import {Injectable} from '@angular/core';
import { HttpService } from 'src/common/services/http.service';



@Injectable()
export class MyTasksService {
 
  constructor(private http: HttpService) {
  }

  getMyTasks(): Promise<any> {
    const url = `/api/Dashboard/GetMyTasks`;
    return this.http.get(url);
  }


}
