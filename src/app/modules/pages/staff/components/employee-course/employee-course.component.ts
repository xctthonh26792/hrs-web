import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { EmployeeCourseApi } from '../../apis';
import { BaseTableComponent } from '../../../../shared/base-table.component';
import { EmployeeCourseActionComponent, EmployeeCourseUploadComponent } from '../../dialogs';
import * as _ from 'lodash';

@Component({
  selector: 'app-employee-course',
  templateUrl: './employee-course.component.html',
  styleUrls: ['./employee-course.component.scss']
})
export class EmployeeCourseComponent extends BaseTableComponent {
  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, api: EmployeeCourseApi, modal: ModalService, toastr: ToastrService) {
    super(injector, api, modal, toastr, route.snapshot.data['fetch']);
    seo.set('Khóa học');
    this.data = _.get(route.snapshot.data, 'data')
  }
  data: any

  init() {
    this.cols = ['code', 'name', 'facutly', 'dob', 'major', 'course', 'start', 'end', 'action']
  }

  async upload() {
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(EmployeeCourseUploadComponent, {
      message: {
        success: 'Tải lên file thông tin khóa học thành công',
        error: 'Tải lên file thông tin khóa học không thành công'
      },
    }, { width: '1024px' })
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
    var instance = await this.modal.show(EmployeeCourseActionComponent, {
      model: this.empty(),
      title: 'Thêm mới khóa học',
      data: this.data,
      message: {
        success: 'Thêm mới khóa học thành công',
        error: 'Thêm mới khóa học không thành công'
      },
      disabled: false
    }, { width: '600px' })
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
    var instance = await this.modal.show(EmployeeCourseActionComponent, {
      model: model,
      data: this.data,
      title: 'Cập nhật khóa học',
      message: {
        success: 'Cập nhật khóa học thành công',
        error: 'Cập nhật khóa học không thành công'
      },
      disabled: false
    }, { width: '600px' })
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
    var instance = await this.modal.show(EmployeeCourseActionComponent, {
      model: model,
      data: this.data,
      title: 'Thông tin khóa học',
      disabled: true
    }, { width: '600px' })
    instance.subscribe((reload) => {
      if (reload) {
        this.refresh();
      }
      this._lock = false;
    })
  }
}
