import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import _ from 'lodash';
import { Utils } from '../utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const permissions: Array<number> = _.get(next.data, 'permissions');
    if (Utils.isArrayNotEmpty(permissions)) {
      if (this.auth.isAuth() && _.chain(permissions).includes(this.auth.permission())) {
        return true;
      }
      this.router.navigate(['/unauthorized']);
      return false;
    }
    if (this.auth.isAuth()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
