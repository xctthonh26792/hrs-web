import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../../../../services';
import { UserApi } from '../../../../../apis';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-staff-reset-password',
  templateUrl: './staff.reset.password.component.html',
  styleUrls: ['./staff.reset.password.component.scss']
})
export class StaffResetPasswordComponent {
  constructor(private ref: MatDialogRef<StaffResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) bindings: any, private toastr: ToastrService, private api: UserApi) {
    this.model.code = _.get(bindings, 'code');
    this.model.username = _.get(bindings, 'username');
  }
  model: {
    username?: string,
    code?: string,
    new_password?: string
    confirm_password?: string
  } = new Object();
  loading: boolean

  accept(form: NgForm) {
    if (form.invalid) { return; }
    if (this.loading) { return; }
    this.loading = true;
    this.api.reset_password(this.model).then(() => {
      this.toastr.success('Khôi phục mật khẩu thành công.');
      this.ref.close(true)
    }, () => {
      this.toastr.error('Khôi phục mật khẩu không thành công.');
    }).then(() => {
      this.loading = false;
    });
  }

  cancel() {
    this.ref.close(false)
  }
}
