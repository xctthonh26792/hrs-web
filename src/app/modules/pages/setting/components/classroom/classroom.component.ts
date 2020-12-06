import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { ClassroomApi } from '../../apis';
import { BaseTableComponent } from '../../../../shared/base-table.component';
import { ClassroomActionComponent } from '../../dialogs';
import * as _ from 'lodash';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent extends BaseTableComponent {
  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, api: ClassroomApi, modal: ModalService, toastr: ToastrService) {
    super(injector, api, modal, toastr, route.snapshot.data['fetch']);
    seo.set('Lớp');
  }
  init() {
    this.config = {
      size: '550px',
      dialog: ClassroomActionComponent,
      create: {
        title: 'Thêm mới lớp',
        message: {
          success: 'Thêm mới lớp thành công',
          error: 'Thêm mới lớp không thành công'
        }
      },
      update: {
        title: 'Cập nhật lớp',
        message: {
          success: 'Cập nhật lớp thành công',
          error: 'Cập nhật lớp không thành công'
        }
      },
      view: {
        title: 'Thông tin lớp'
      }
    }
    this.cols = ['code', 'name', 'status', 'action']
  }

  empty() {
    return {
    }
  }

}
