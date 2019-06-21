import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { AuthService } from './auth.service';
import { SpinnerService } from './spinner.service';
import { catchError, tap } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs/index';

@Injectable()
export class ApplicationHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router, private spinnerService: SpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // emit onStarted event before request execution
    this.spinnerService.onStarted(req);

    return next.handle(req).pipe(catchError((err) => this.handleAuthError(err)),
      tap(_ => {
        this.spinnerService.onFinished(req);
      }
      ));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.authService.logout();
      this.router.navigate(['/', 'login']);
    }
    return throwError(err);
  }
}
