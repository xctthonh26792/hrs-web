import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../../auths';
import { CenterApi } from '../../../../apis';
import { StorageService } from '../../../../services';

@Injectable()
export class CenterResolve implements Resolve<Object> {
  constructor(private router: Router, private api: CenterApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const quantity = this.storage.resolve(state.url) || 10;
    return this.api.fetch(1, quantity);
  }
}

@Injectable()
export class CenterSelectizeResolve implements Resolve<Object> {
  constructor(private router: Router, private api: CenterApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.selectize();
  }
}

