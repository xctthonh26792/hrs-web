import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../../../../services';
import { UserApi } from '../../../../../apis';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-staff.create.user',
  templateUrl: './staff.create.user.component.html',
  styleUrls: ['./staff.create.user.component.scss']
})
export class StaffCreateUserComponent {

  constructor(private ref: MatDialogRef<StaffCreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) bindings: any, private toastr: ToastrService, private api: UserApi) {
    this.model.code = _.get(bindings, 'code')
    this.permissions = [
      {
        code: 1,
        name: "Quản trị hệ thống"
      },
      {
        code: 2,
        name: "Nhân viên"
      },
    ]
  }
  model: {
    code?: string,
    username?: string
    password?: string
    name?: string,
    permission?: number
  } = new Object();
  loading: boolean
  permissions: Array<any>

  accept(form: NgForm) {
    if (form.invalid) { return; }
    if (this.loading) { return; }
    this.loading = true;
    this.api.create_account(this.model).then(() => {
      this.toastr.success('Tạo mới tài khoản thành công');
      this.ref.close(true);
    }, () => {
      this.toastr.error('Tạo mới tài khoản không thành công');
    }).then(() => {
      this.loading = false;
    });
  }

  cancel() {
    this.ref.close(false)
  }
}
