import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../../../services';
import { AuthApi } from '../../../../auths';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-action',
  templateUrl: './profile.action.component.html',
  styleUrls: ['./profile.action.component.scss']
})
export class ProfileActionComponent {
  constructor(private ref: MatDialogRef<ProfileActionComponent>,
    @Inject(MAT_DIALOG_DATA) bindings: any, private toastr: ToastrService, private auth: AuthApi) {
    this.profile = bindings['profile'];
  }
  profile: {
    name: string
    extra_props: {
      email: string
      address: string
      phone: string
    }
  };
  loading: boolean

  accept(form: NgForm) {
    if (form.invalid) { return; }
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.auth.save(this.profile).then(() => {
      this.toastr.success('Cập nhật thông tin cá nhân thành công');
      this.ref.close()
    }, () => {
      this.toastr.error('Cập nhật thông tin cá nhân thất bại');
    }).then(() => {
      this.loading = false;
    });
  }

  cancel() {
    this.ref.close()
  }
}
