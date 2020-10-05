import { Component, ViewContainerRef } from '@angular/core';
import { AuthService } from './auths';
import { LoadingService, SeoService } from './services';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private view: ViewContainerRef, private auth: AuthService, private loading: LoadingService, private seo: SeoService,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.listen();
    this.init();
    this.registrationIcon()
  }
  _loading: boolean;

  listen() {
    this.loading.listener.subscribe((value: boolean) => {
      this._loading = value;
    });
  }

  init() {
    this.seo.init('Course');
    if (this.auth.isAuth()) {
      this._loading = true;
      this.auth.renew().then(() => {
        this._loading = false;
      });
    }
  }

  registrationIcon() {
    this.matIconRegistry.addSvgIcon('education', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/education.svg"))
    this.matIconRegistry.addSvgIcon('level', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/level.svg"))
    this.matIconRegistry.addSvgIcon('graduated', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/graduated.svg"))
    this.matIconRegistry.addSvgIcon('center', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/center.svg"))
    this.matIconRegistry.addSvgIcon('clipboard', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/clipboard.svg"))
    this.matIconRegistry.addSvgIcon('course', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/course.svg"))
    this.matIconRegistry.addSvgIcon('excel', this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/excel.svg"))
  }

}
