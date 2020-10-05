import { Injectable } from '@angular/core';
import { AuthApi } from './auth.api';
import { Router } from '@angular/router';
import { AuthStorage } from './auth.storage';

@Injectable()
export class AuthService {
  constructor(private api: AuthApi, private storage: AuthStorage, private router: Router) {
    this.resolve();
  }
  private authentication: any;

  login(username: string, password: string) {
    return this.api.login({ username: username, password: password }).then((response) => this.resolve(response));
  }

  renew() {
    return this.api.renew().then(
      (response) => this.resolve(response),
      () => { this.logout(); }
    );
  }

  resolve(response?: any): void {
    this.authentication = this.storage.resolve(response);
  }

  isAuth() {
    return this.authentication !== undefined;
  }

  logout() {
    this.storage.remove();
    this.authentication = undefined;
    this.router.navigateByUrl('/login')
  }

  name() {
    if (this.authentication) {
      return this.authentication.name;
    }
    return undefined;
  }

  token() {
    if (this.authentication) {
      return this.authentication.access_token;
    }
    return undefined;
  }

  code() {
    if (this.authentication) {
      return this.authentication.code;
    }
    return undefined;
  }

  default() {
    if (this.authentication) {
      return this.authentication.default;
    }
    return undefined;
  }

  permission() {
    if (this.authentication) {
      return this.authentication.permission || 0;
    }
    return 0;
  }
}
