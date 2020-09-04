import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/common/services/alert.service';


@Injectable()
export class EndpointService {

  constructor(private http: HttpClient, private alertService: AlertService) {
  }


  getEndpoint(companyKey): Promise<any> {
    const serviceUrl = "https://api.kiansoft-eg.com/api/AppRegistration/RegisterApp";
    const data = {
      "CompanyKey":companyKey,
      "AppID":"3DMW-RICG-6OK7-796F"
    };
    return new Promise((resolve, reject) => {
                  this.http.post<any>(serviceUrl, data).subscribe(res => {
                    if (res.Success) {
                        resolve(res);
                    } else {
                      this.alertService.displayErrorToast(res.Message);
                    }
                  } , error => {
                    reject([]);
                }); });  }


}
