import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { LevelApi } from '../../apis';
import { BaseTableComponent } from '../../../../shared/base-table.component';
import { LevelActionComponent } from '../../dialogs';
import * as _ from 'lodash';


@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent extends BaseTableComponent {
  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, api: LevelApi, modal: ModalService, toastr: ToastrService) {
    super(injector, api, modal, toastr, route.snapshot.data['fetch']);
    seo.set('Trình độ');
  }
  init() {
    this.config = {
      size: '550px',
      dialog: LevelActionComponent,
      create: {
        title: 'Thêm mới trình độ',
        message: {
          success: 'Thêm mới trình độ thành công',
          error: 'Thêm mới trình độ không thành công'
        }
      },
      update: {
        title: 'Cập nhật trình độ',
        message: {
          success: 'Cập nhật trình độ thành công',
          error: 'Cập nhật trình độ không thành công'
        }
      },
      view: {
        title: 'Thông tin trình độ'
      }
    }
    this.cols = ['code', 'name', 'status', 'action']
  }

  empty() {
    return {
    }
  }

}
