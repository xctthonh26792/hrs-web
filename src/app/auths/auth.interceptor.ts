import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthStorage } from './auth.storage';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public storage: AuthStorage) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.storage.resolve();
    if (auth && auth.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${auth.access_token}`
        }
      });
    }
    return next.handle(request);
  }
}
