import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../AppConstants';
import { AlertService } from './alert.service';



@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = AppConstants.getApiEndpoin();

  constructor(private http: HttpClient, private alertService: AlertService) {
  }

  get(url) {
    const serviceUrl = this.baseUrl + url;
    return new Promise((resolve, reject) => {
                  this.http.get<any>(serviceUrl).subscribe(res => {
                    if (res.Success) {
                      resolve(res);
                    } else {
                      this.alertService.displayErrorToast(res.Message);
                    }
                  } , error => {
                    reject([]);
                }); });
  }

  post(url, data, displayAlertSuccessMsg = true) {
    const serviceUrl = this.baseUrl + url;
    return new Promise((resolve, reject) => {
                  this.http.post<any>(serviceUrl, data).subscribe(res => {
                    if (res.Success) {
                      if (displayAlertSuccessMsg) {
                        this.alertService.displaySuccessMessage();
                      }
                      resolve(res);
                    } else {
                      this.alertService.displayErrorToast(res.Message);
                    }
                  } , error => {
                    reject([]);
                }); });
  }

}
