import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../../../services';
import { AuthApi } from '../../../../auths';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  constructor(private ref: MatDialogRef<ChangePasswordComponent>, private toastr: ToastrService, private auth: AuthApi) {
  }
  model: {
    old_password?: string
    new_password?: string
    confirm_password?: string
  } = new Object();
  loading: boolean

  accept(form: NgForm) {
    if (form.invalid) { return; }
    if (this.loading) {
      return
    }
    this.loading = true
    this.auth.password(this.model).then(() => {
      this.toastr.success('Đổi mật khẩu thành công');
      this.ref.close()
    }, () => {
      this.toastr.error('Đổi mật khẩu thất bại');
    }).then(() => {
      this.loading = false;
    });
  }

  cancel() {
    this.ref.close()
  }
}
