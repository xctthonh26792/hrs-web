import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auths';
import { ToastrService, SeoService } from '../../../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private auth: AuthService, private toastr: ToastrService, private router: Router, private seo: SeoService) {
    seo.set('Đăng nhập');
    this.count = 0;
  }
  username: string;
  password: string;
  count: number

  login() {
    this.auth
      .login(this.username, this.password)
      .then(() => {
        this.toastr.success(`Đăng nhập thành công. Chào mừng ${this.auth.name()} đã quay trở lại hệ thống.`);
        this.router.navigateByUrl('');
      }, () => {
        this.toastr.error(`Đăng nhập thất bại. Vui lòng kiểm tra tài khoản hoặc liên hệ quản trị viên.`);
      });
  }
}
