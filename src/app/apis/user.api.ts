import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpWrapper } from './http-wrapper';
import { environment } from '../../environments/environment';

@Injectable()
export class UserApi extends HttpWrapper {
  constructor(http: HttpClient) {
    super(http, `${environment.api_url}/user`);
  }

  create_account(model: any) {
    return this.http.post(`${environment.api_url}/user` + '/register', model).toPromise();
  }
  reset_password(model: any) {
    return this.http.post(`${environment.api_url}/user` + '/reset-password', model).toPromise();
  }
}
