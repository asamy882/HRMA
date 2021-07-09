import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject, from } from 'rxjs';
import { AppConstants } from '../AppConstants';
import { FCM } from '@ionic-native/fcm/ngx';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string;
  private errorMsg: string;
  private userToken: string;
  public myInfo: any;
  public myPhoto: string;
  public allowedScreens: string[];
  private baseUrl = AppConstants.getApiEndpoin();
  private encryptSecretKey = 'c027d14c026a3fa74f7cef1a1c93c0a3';

  constructor(private http: HttpClient, private fcm: FCM) {
  }

  getCompanies(): Observable<any> {
    if(!this.baseUrl){
      this.baseUrl = AppConstants.getApiEndpoin();
    }
    return this.http.get(this.baseUrl + '/api/Lookups/GetCompanies');
  }


  login(companyId, username, password): Observable<any> {
    //localStorage.clear();
    if(!this.baseUrl){
      this.baseUrl = AppConstants.getApiEndpoin();
    }
    const loginUrl = this.baseUrl + `/api/Authentication/Login?companyId=${companyId}&username=${username}&password=${password}`;
    return this.http.post<any>(loginUrl, null)
      .pipe(map(res => {
        // login successful if there's a jwt token in the response
        if (res.Success) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.userToken = res.Item.Token;
          this.allowedScreens = res.Item.AllowedScreens;
          localStorage.setItem('userToken', res.Item.Token);
          localStorage.setItem('allowedScreens', JSON.stringify(res.Item.AllowedScreens));
         // localStorage['userToken'] = res.Item.Token;
        } else {
          this.errorMsg = res.Message;
        }
      }));
  }

  getErrorMsg() {
    return this.errorMsg;
  }

  logout(): void {
    const API_ENDPOINT = localStorage.getItem("API_ENDPOINT");
    const deviceId = localStorage.getItem("deviceId");
    localStorage.clear();
    localStorage.setItem('API_ENDPOINT', API_ENDPOINT);
    localStorage.setItem('deviceId', deviceId);
  }

  getUserToken() {
   // const userToken = localStorage.getItem('userToken');
    return this.userToken ? this.userToken : localStorage.getItem('userToken');
  }

  getUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return currentUser;
    }
    return null;
  }

  isUserAuthenticated() {
    if (!this.userToken) {
      this.userToken = localStorage.getItem('userToken');
    }
    return this.userToken ? true : false;
  }

  hasAnyAuthority(authorities: string[]): Promise<boolean> {
    return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
  }

  hasAnyAuthorityDirect(authorities: string[]): boolean {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser')
    );
    if (!currentUser || !currentUser.userToken || !currentUser.authorities) {
      return false;
    }

    // return true;

    for (const auth1 of authorities) {
      for (const auth2 of currentUser.authorities) {
        if (auth2 === auth1) {
          return true;
        }
      }
    }

    return false;
  }

  hasAuthority(authority: string): Promise<boolean> {
    if (this.hasAnyAuthorityDirect([authority])) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  getAuthenticationState(): Observable<any> {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser')
    );
    const subject = new Subject<any>();
    subject.next(currentUser);
    return subject.asObservable();
  }

  loadMyInfo() {
    const url = this.baseUrl +
                `/api/Dashboard/GetMyInfo`;
    return new Promise((resolve, reject) => {
                  this.http.get<any>(url).subscribe(res => {
                    if (res.Success) {
                      this.myInfo = res.Item;
                      localStorage.setItem('myInfo', JSON.stringify(this.myInfo));
                      resolve(res.Item);
                    }
                  } , error => {
                    reject([]);
                }); });
  }

  getMyInfo() {
    if (!this.myInfo || this.myInfo == null) {
      this.myInfo = JSON.parse(localStorage.getItem('myInfo'));
    }
    return this.myInfo;
  }

  loadMyPhoto(): Observable<any> {
    const url = this.baseUrl +
                `/api/Dashboard/GetMyPhoto`;
    return this.http.get<any>(url);
  }

  setMyPhoto(myPhoto) {
    this.myPhoto = myPhoto;
    localStorage.setItem('myPhoto', this.myPhoto);
  }


  getMyPhoto() {
    if (!this.myPhoto || this.myPhoto == null) {
      this.myPhoto = localStorage.getItem('myPhoto');
    }
    return this.myPhoto;
  }

  getAllowedScreens() {
    if (!this.allowedScreens) {
      this.allowedScreens = JSON.parse(localStorage.getItem('allowedScreens'));
    }
    return this.allowedScreens;
  }

  updateUserDeviceId(token): Observable<any> {
    const url = this.baseUrl +
                `/api/Authentication/UpdateUserDeviceId`;
    const param = {deviceId: token};
    return this.http.post<any>(url, param);
  }

  enablePushNotification() {
    this.fcm.getToken().then(token => {
      console.log('getToken ', token);
      localStorage.setItem('fcmToken',token);
      this.updateUserDeviceId(token).subscribe(res => {});
    });
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log('onTokenRefresh ', token);
      this.updateUserDeviceId(token).subscribe(res => {});

    });
    this.fcm.onNotification().subscribe(data => {
      console.log('onNotification ', data);
    });
  }

}
