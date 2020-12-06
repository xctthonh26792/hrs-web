import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../auths';
import { CenterApi, EmployeeApi, StudentApi, FacutlyApi } from '../../../apis';
import { CourseApi, ClassroomApi } from '../../pages/setting/apis'
import { StorageService } from '../../../services';

@Injectable()
export class CenterSelectizeResolve implements Resolve<Object> {
  constructor(private router: Router, private api: CenterApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.selectize();
  }
}

@Injectable()
export class EmployeeSelectizeResolve implements Resolve<Object> {
  constructor(private router: Router, private api: EmployeeApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.selectize();
  }
}

@Injectable()
export class StudentSelectizeResolve implements Resolve<Object> {
  constructor(private router: Router, private api: StudentApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.selectize();
  }
}

@Injectable()
export class CourseSelectizeResolve implements Resolve<Object> {
  constructor(private router: Router, private api: CourseApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.selectize();
  }
}

@Injectable()
export class FacutlySelectizeResolve implements Resolve<Object> {
  constructor(private router: Router, private api: FacutlyApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.selectize();
  }
}

@Injectable()
export class ClassroomSelectizeResolve implements Resolve<Object> {
  constructor(private router: Router, private api: ClassroomApi, private auth: AuthService, private storage: StorageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.selectize();
  }
}

