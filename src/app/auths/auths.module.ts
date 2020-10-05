import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthConfig } from './auth.config';
import { AuthStorage } from './auth.storage';
import { AuthApi } from './auth.api';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: []
})
export class AuthsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthsModule,
      providers: [
        AuthConfig,
        AuthStorage,
        AuthApi,
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        AuthGuard
      ]
    };
  }
}
