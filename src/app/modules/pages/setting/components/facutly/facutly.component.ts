import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { FacutlyApi } from '../../../../../apis';
import { BaseTableComponent } from '../../../../shared/base-table.component';
import { FacutlyActionComponent } from '../../dialogs';
import * as _ from 'lodash';


@Component({
  selector: 'app-facutly',
  templateUrl: './facutly.component.html',
  styleUrls: ['./facutly.component.scss']
})
export class FacutlyComponent extends BaseTableComponent {
  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, api: FacutlyApi, modal: ModalService, toastr: ToastrService) {
    super(injector, api, modal, toastr, route.snapshot.data['fetch']);
    seo.set('Khoa');
  }
  init() {
    this.config = {
      size: '550px',
      dialog: FacutlyActionComponent,
      create: {
        title: 'Thêm mới khoa',
        message: {
          success: 'Thêm mới khoa thành công',
          error: 'Thêm mới khoa không thành công'
        }
      },
      update: {
        title: 'Cập nhật khoa',
        message: {
          success: 'Cập nhật khoa thành công',
          error: 'Cập nhật khoa không thành công'
        }
      },
      view: {
        title: 'Thông tin khoa'
      }
    }
    this.cols = ['code', 'name', 'status', 'action']
  }

  empty() {
    return {
    }
  }

}
