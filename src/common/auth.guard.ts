/**
 * Created by ahmed on 11/18/18.
 */
import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  NavigationExtras,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const url: string = state.url;
    if (url == '/logout') {
      localStorage.clear();
    }
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    let url = `/${route.path}`;
    if (!this.authService.isUserAuthenticated()) {
      return true;
    }
    this.router.navigate(['/', 'dashboard']);
    return false;
  }

  checkLogin(url: string): boolean {
    if (this.authService.isUserAuthenticated()) {
      return true;
    }

    // Store the attempted URL for redirecting
    //this.authService.redirectUrl = url;

    // Create a dummy session id
    let sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      /*queryParams: { 'session_id': sessionId },
       fragment: 'anchor'*/
    };

    localStorage.clear();
    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras).then(() => {
      window.location.reload();
    });
    return false;
  }
}
