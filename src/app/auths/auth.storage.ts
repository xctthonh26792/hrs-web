import { Injectable } from '@angular/core';
import { AuthConfig } from './auth.config';

@Injectable()
export class AuthStorage {
  constructor(private config: AuthConfig) {
  }

  get key() {
    return this.config.storage();
  }

  resolve(value?: any): any {
    if (value) {
      localStorage.setItem(this.config.storage(), JSON.stringify(value));
    }
    const loc = localStorage.getItem(this.config.storage());
    return loc ? JSON.parse(loc) : undefined;
  }

  remove() {
    localStorage.removeItem(this.config.storage());
  }
}
