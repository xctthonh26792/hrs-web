import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auths';

@Injectable()
export class ProtectedGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.default()) {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
