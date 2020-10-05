import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../../auths';
import { DashboardApi } from '../../../../apis';
import { StorageService } from '../../../../services';

@Injectable()
export class DashboardResolve implements Resolve<Object> {
  constructor(private router: Router, private api: DashboardApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.get('dashboarddata')
  }
}

