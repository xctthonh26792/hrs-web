import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthConfig } from './auth.config';

@Injectable()
export class AuthApi {
  constructor(private http: HttpClient, private config: AuthConfig) {
  }

  login(model: { username: string; password: string }) {
    return this.http.post(this.config.api(), { username: model.username, password: model.password }).toPromise();
  }

  get() {
    return this.http.get(this.config.api() + '/profile').toPromise();
  }

  save(profile: any) {
    return this.http.post(this.config.api() + '/profile', profile).toPromise();
  }

  password(model: any) {
    return this.http.post(this.config.api() + '/change-password', model).toPromise();
  }

  renew() {
    return this.http.post(this.config.api() + '/renew', {}).toPromise();
  }
}
