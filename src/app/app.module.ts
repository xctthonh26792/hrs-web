import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthsModule, AuthConfig, AuthGuard } from './auths';
import { ApisModule } from './apis';
import { ServicesModule } from './services';
import { HomeModule } from './modules/home/home.module';
import { AmazingTimePickerModule } from './plugins/amazing-time-picker';
import { NgxSummernoteModule } from './plugins/ngx-summernote'

import { NgxMaskModule } from './plugins/ngx-mask';

import { environment } from '../environments/environment';

import { ProtectedGuard } from './guards/protected.guard';

@Injectable()
export class TenjinAuthConfig extends AuthConfig {
  api() {
    return `${environment.api_url.trim()}/token`;
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthsModule.forRoot(),
    ApisModule.forRoot(),
    ServicesModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxSummernoteModule.forRoot(),
    HomeModule,
    AmazingTimePickerModule,
  ],
  providers: [
    { provide: AuthConfig, useClass: TenjinAuthConfig },
    AuthGuard,
    ProtectedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
