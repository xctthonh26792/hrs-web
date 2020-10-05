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
    seo.set('Trường');
  }
  init() {
    this.config = {
      size: '550px',
      dialog: CenterActionComponent,
      create: {
        title: 'Thêm mới trường',
        message: {
          success: 'Thêm mới trường thành công',
          error: 'Thêm mới trường không thành công'
        }
      },
      update: {
        title: 'Cập nhật trường',
        message: {
          success: 'Cập nhật trường thành công',
          error: 'Cập nhật trường không thành công'
        }
      },
      view: {
        title: 'Thông tin trường'
      }
    }
    this.cols = ['code', 'name', 'status', 'action']
  }

  empty() {
    return {
    }
  }

}
