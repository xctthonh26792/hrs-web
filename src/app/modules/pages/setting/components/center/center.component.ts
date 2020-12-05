import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { CenterApi } from '../../../../../apis';
import { BaseTableComponent } from '../../../../shared/base-table.component';
import { CenterActionComponent } from '../../dialogs';
import * as _ from 'lodash';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent extends BaseTableComponent {
  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, api: CenterApi, modal: ModalService, toastr: ToastrService) {
    super(injector, api, modal, toastr, route.snapshot.data['fetch']);
    seo.set('Đơn vị');
  }
  init() {
    this.config = {
      size: '550px',
      dialog: CenterActionComponent,
      create: {
        title: 'Thêm mới đơn vị',
        message: {
          success: 'Thêm mới đơn vị thành công',
          error: 'Thêm mới đơn vị không thành công'
        }
      },
      update: {
        title: 'Cập nhật đơn vị',
        message: {
          success: 'Cập nhật đơn vị thành công',
          error: 'Cập nhật đơn vị không thành công'
        }
      },
      view: {
        title: 'Thông tin đơn vị'
      }
    }
    this.cols = ['code', 'name', 'status', 'action']
  }

  empty() {
    return {
    }
  }

}
