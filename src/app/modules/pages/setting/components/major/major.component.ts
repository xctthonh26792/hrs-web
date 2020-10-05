import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { MajorApi } from '../../apis';
import { BaseTableComponent } from '../../../../shared/base-table.component';
import { MajorActionComponent } from '../../dialogs';
import * as _ from 'lodash';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.scss']
})
export class MajorComponent extends BaseTableComponent {
  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, api: MajorApi, modal: ModalService, toastr: ToastrService) {
    super(injector, api, modal, toastr, route.snapshot.data['fetch']);
    seo.set('Chuyên môn');
  }
  init() {
    this.config = {
      size: '550px',
      dialog: MajorActionComponent,
      create: {
        title: 'Thêm mới chuyên môn',
        message: {
          success: 'Thêm mới chuyên môn thành công',
          error: 'Thêm mới chuyên môn không thành công'
        }
      },
      update: {
        title: 'Cập nhật chuyên môn',
        message: {
          success: 'Cập nhật chuyên môn thành công',
          error: 'Cập nhật chuyên môn không thành công'
        }
      },
      view: {
        title: 'Thông tin chuyên môn'
      }
    }
    this.cols = ['code', 'name', 'status', 'action']
  }

  empty() {
    return {
    }
  }

}
