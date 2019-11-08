import {Injectable} from '@angular/core';
import { HttpService } from 'src/common/services/http.service';



@Injectable()
export class MyVacationsBalanceService {
 
  constructor(private http: HttpService) {
  }

  getMyVacationsBalance(): Promise<any> {
    const url = `/api/Dashboard/GetMyVacationsBalance`;
    return this.http.get(url);
  }


}
