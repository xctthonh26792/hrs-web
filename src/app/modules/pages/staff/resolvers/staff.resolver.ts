import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../../auths';
import { EmployeeApi } from '../../../../apis';
import { StorageService } from '../../../../services';

@Injectable()
export class StaffResolve implements Resolve<Object> {
  constructor(private router: Router, private api: EmployeeApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const quantity = this.storage.resolve(state.url) || 10;
    return this.api.fetch(1, quantity);
  }
}

@Injectable()
export class EmployeeDataResolve implements Resolve<Object> {
  constructor(private router: Router, private api: EmployeeApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.get('employeedata');
  }
}
