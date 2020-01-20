import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authSrc: AuthService, private router: Router) {
  }

  canActivate() {
    // const currentUser = this.authSrc.currentUserValue;
    if (localStorage.getItem('currentUser')) {
      const timestamp = new Date().getTime();
      const time = +localStorage.getItem('dateExp');
      if (timestamp <= time) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}
