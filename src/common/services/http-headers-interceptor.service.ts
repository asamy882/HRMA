import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import { LanguageService } from './language.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getUserToken();
    let lang = 'en';
    if (localStorage.getItem('current_lang')) {
      lang = localStorage.getItem('current_lang');
    }
    request = request.clone({
      setHeaders: {
        UserToken: `${token}`,
        'Accept-Language': lang == 'ar' ? 'ar-EG' : 'en-US'
      }
    });
    return next.handle(request);
  }
}
