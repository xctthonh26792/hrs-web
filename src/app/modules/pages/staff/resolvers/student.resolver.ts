import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../../auths';
import { StudentApi } from '../../../../apis';
import { StorageService } from '../../../../services';

@Injectable()
export class StudentResolve implements Resolve<Object> {
  constructor(private router: Router, private api: StudentApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const quantity = this.storage.resolve(state.url) || 10;
    return this.api.fetch(1, quantity);
  }
}

@Injectable()
export class StudentDataResolve implements Resolve<Object> {
  constructor(private router: Router, private api: StudentApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.get('studentdata');
  }
}


