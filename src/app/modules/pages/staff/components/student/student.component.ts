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
    seo.set('Sinh viên');
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
      title: 'Thêm mới sinh viên',
      data: this.data,
      message: {
        success: 'Thêm mới sinh viên thành công',
        error: 'Thêm mới sinh viên không thành công'
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
      title: 'Cập nhật sinh viên',
      data: this.data,
      message: {
        success: 'Cập nhật sinh viên thành công',
        error: 'Cập nhật sinh viên không thành công'
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
        success: 'Tải lên file thông tin sinh viên thành công',
        error: 'Tải lên file thông tin sinh viên không thành công'
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
      title: 'Thông tin sinh viên',
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
