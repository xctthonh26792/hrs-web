import { Component } from '@angular/core';
import { AuthService } from '../../../../auths';
import { SeoService } from '../../../../services';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent {
    constructor(private auth: AuthService, seo: SeoService) {
        seo.set('403')
    }

    isAuth() {
        return this.auth.isAuth()
    }
}
