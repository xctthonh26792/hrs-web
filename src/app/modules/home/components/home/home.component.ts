import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthApi } from '../../../../auths';
import { ModalService } from '../../../../services';

import { ProfileActionComponent, ChangePasswordComponent } from '../../dialogs';

import { ROUTES } from './home.routes';
import { Utils } from '../../../../utils';
import * as _ from 'lodash';
import { MatSidenavContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private auth: AuthService, private api: AuthApi, private route: Router, public modal: ModalService) {
  }
  routes = ROUTES;
  @ViewChild("drawer") drawer: MatSidenavContainer

  get name() {
    return this.auth.name();
  }

  prefix(name: string) {
    const prepare = (href: string) => {
      return _.first(href.split('/'))
    }
    const parse = (href: string) => {
      if (Utils.isStringEmpty(href)) {
        return ''
      }
      return _.startsWith(href, '/') ? prepare(href.substring(1)) : prepare(href)
    }
    return parse(this.route.routerState.snapshot.url) === parse(name)
  }

  profile() {
    const resolver = {
      profile: () => this.api.get()
    };
    this.modal.show(ProfileActionComponent, resolver, { width: '450px' });
  }

  password() {
    this.modal.show(ChangePasswordComponent, {}, { width: '450px' });
  }

  logout() {
    this.auth.logout();
  }

  isInRole(permissions: Array<number>) {
    if (Utils.isArrayNotEmpty(permissions)) {
      return _.chain(permissions).includes(this.auth.permission()).value()
    }
    return true
  }

  navigate(url: string) {
    this.route.navigateByUrl(url)
    if (this.drawer) {
      this.drawer.close()
    }
  }
}
