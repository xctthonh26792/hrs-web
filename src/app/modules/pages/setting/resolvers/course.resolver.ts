import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../../auths';
import { CourseApi } from '../apis';
import { StorageService } from '../../../../services';

@Injectable()
export class CourseResolve implements Resolve<Object> {
  constructor(private router: Router, private api: CourseApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const quantity = this.storage.resolve(state.url) || 10;
    return this.api.post(`all-course`, {
      page: 1,
      quantity: quantity,
      query: ''
    });
  }
}

