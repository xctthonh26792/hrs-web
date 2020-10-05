import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { EmployeeApi } from '../../../../../apis';
import { BaseTableComponent } from '../../../../shared/base-table.component';
import { StaffActionComponent, StaffResetPasswordComponent, StaffCreateUserComponent, StaffUploadComponent } from '../../dialogs';
import * as _ from 'lodash';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent extends BaseTableComponent {
  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, api: EmployeeApi, modal: ModalService, toastr: ToastrService) {
    super(injector, api, modal, toastr, route.snapshot.data['fetch']);
    seo.set('nhân viên');
    this.data = _.get(route.snapshot.data, 'data')
  }
  data: any

  init() {
    this.cols = ['code', 'name', 'email', 'phone', 'dob', 'facutly', 'major', 'status', 'action']
  }

  async create_user(element) {
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(StaffCreateUserComponent, {
      code: element.id,
    }, { width: '550px' })
    instance.subscribe((reload) => {
      if (reload) {
        this.refresh();
      }
      this._lock = false;
    })
  }

  async upload() {
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(StaffUploadComponent, {
      message: {
        success: 'Tải lên file thông tin nhân viên thành công',
        error: 'Tải lên file thông tin nhân viên không thành công'
      },
    }, { width: '1024px' })
    instance.subscribe((reload) => {
      if (reload) {
        this.refresh();
      }
      this._lock = false;
    })
  }

  async reset_password(element) {
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(StaffResetPasswordComponent, {
      code: element.id,
      username: element.username
    }, { width: '450px' })
    instance.subscribe((reload) => {
      if (reload) {
        this.refresh();
      }
      this._lock = false;
    })
  }

  async create() {
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(StaffActionComponent, {
      model: this.empty(),
      title: 'Thêm mới nhân viên',
      data: this.data,
      message: {
        success: 'Thêm mới nhân viên thành công',
        error: 'Thêm mới nhân viên không thành công'
      },
      disabled: false
    }, { width: '900px' })
    instance.subscribe((reload) => {
      if (reload) {
        this.refresh();
      }
      this._lock = false;
    })
  }

  async update(model: any) {
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(StaffActionComponent, {
      model: model,
      data: this.data,
      title: 'Cập nhật nhân viên',
      message: {
        success: 'Cập nhật nhân viên thành công',
        error: 'Cập nhật nhân viên không thành công'
      },
      disabled: false
    }, { width: '900px' })
    instance.subscribe((reload) => {
      if (reload) {
        this.refresh();
      }
      this._lock = false;
    })
  }

  async view(model: any) {
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(StaffActionComponent, {
      model: model,
      data: this.data,
      title: 'Thông tin nhân viên',
      disabled: true
    }, { width: '900px' })
    instance.subscribe((reload) => {
      if (reload) {
        this.refresh();
      }
      this._lock = false;
    })
  }
}
