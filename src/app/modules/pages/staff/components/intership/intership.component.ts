import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { IntershipApi } from '../../apis';
import { BaseTableComponent } from '../../../../shared/base-table.component';
import { IntershipAcitonComponent, IntershipUploadComponent } from '../../dialogs';
import * as _ from 'lodash';


@Component({
  selector: 'app-intership',
  templateUrl: './intership.component.html',
  styleUrls: ['./intership.component.scss']
})
export class IntershipComponent extends BaseTableComponent {
  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, api: IntershipApi, modal: ModalService, toastr: ToastrService) {
    super(injector, api, modal, toastr, route.snapshot.data['fetch']);
    seo.set('Thực tập');
    this.data = _.get(route.snapshot.data, 'data')
  }
  data: any

  init() {
    this.cols = ['code', 'name', 'dob', 'facutly', 'major', 'class', 'start', 'end', 'action']
  }


  async create() {
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(IntershipAcitonComponent, {
      model: this.empty(),
      title: 'Thêm mới thực tập',
      data: this.data,
      message: {
        success: 'Thêm mới thực tập thành công',
        error: 'Thêm mới thực tập không thành công'
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

  async upload() {
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(IntershipUploadComponent, {
      message: {
        success: 'Tải lên file thông tin thực tập thành công',
        error: 'Tải lên file thông tin thực tập không thành công'
      },
    }, { width: '1024px' })
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
    var instance = await this.modal.show(IntershipAcitonComponent, {
      model: model,
      data: this.data,
      title: 'Cập nhật thực tập',
      message: {
        success: 'Cập nhật thực tập thành công',
        error: 'Cập nhật thực tập không thành công'
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
    var instance = await this.modal.show(IntershipAcitonComponent, {
      model: model,
      data: this.data,
      title: 'Thông tin thực tập',
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
