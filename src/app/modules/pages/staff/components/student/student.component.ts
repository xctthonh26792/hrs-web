import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { StudentApi, CenterApi } from '../../../../../apis';
import { BaseTableComponent } from '../../../../shared/base-table.component';
import { StudentActionComponent, StudentUploadComponent } from '../../dialogs';
import * as _ from 'lodash';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent extends BaseTableComponent {
  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, api: StudentApi, modal: ModalService, toastr: ToastrService, private cApi: CenterApi) {
    super(injector, api, modal, toastr, route.snapshot.data['fetch']);
    seo.set('Học viên');
    this.data = _.get(route.snapshot.data, 'data')
  }
  data: any;

  init() {
    this.cols = ['code', 'name', 'center', 'class', 'major', 'course', 'email', 'phone', 'dob', 'status', 'action']
  }

  async create() {
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(StudentActionComponent, {
      model: this.empty(),
      title: 'Thêm mới học viên',
      data: this.data,
      message: {
        success: 'Thêm mới học viên thành công',
        error: 'Thêm mới học viên không thành công'
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
    var instance = await this.modal.show(StudentActionComponent, {
      model: model,
      title: 'Cập nhật học viên',
      data: this.data,
      message: {
        success: 'Cập nhật học viên thành công',
        error: 'Cập nhật học viên không thành công'
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

  async upload() {
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(StudentUploadComponent, {
      message: {
        success: 'Tải lên file thông tin học viên thành công',
        error: 'Tải lên file thông tin học viên không thành công'
      },
    }, { width: '1024px' })
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
    var instance = await this.modal.show(StudentActionComponent, {
      model: model,
      data: this.data,
      title: 'Thông tin học viên',
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
