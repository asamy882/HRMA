import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject, from } from 'rxjs';
import { AppConstants } from '../AppConstants';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl: string;
  private errorMsg: string;
  private userToken: string;
  private myInfo: string;
  private myPhoto: string;
  private baseUrl = AppConstants.API_ENDPOINT;

  constructor(private http: HttpClient) {
  }

  getCompanies(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/Lookups/GetCompanies');
  }


  login(companyId, username, password): Observable<any> {
    //localStorage.clear();
    const loginUrl = this.baseUrl + `/api/Authentication/Login?companyId=${companyId}&username=${username}&password=${password}`;
    return this.http.post<any>(loginUrl, null)
      .pipe(map(res => {
        // login successful if there's a jwt token in the response
        if (res.Success) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.userToken = res.Item.Token;
          localStorage.setItem('userToken', res.Item.Token);
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
    //localStorage.clear();
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
    this.http.get<any>(url).subscribe(res => {
      if (res.Success) {
        this.myInfo = res.Item;
        localStorage.setItem('myInfo', JSON.stringify(this.myInfo));
      }
    });
  }

  getMyInfo() {
    if (!this.myInfo || this.myInfo == null) {
      this.myInfo = JSON.parse(localStorage.getItem('myInfo'));
    }
    return this.myInfo;
  }

  loadMyPhoto() {
    const url = this.baseUrl +
                `/api/Dashboard/GetMyPhoto`;
    this.http.get<any>(url).subscribe(res => {
      if (res.Success && res.Item) {
        this.myPhoto = res.Item;
        localStorage.setItem('myPhoto', this.myPhoto);
      }
    });
  }

  getMyPhoto() {
    if (!this.myPhoto || this.myPhoto == null) {
      this.myPhoto = localStorage.getItem('myPhoto');
    }
    return this.myPhoto;
  }

}
