import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { CourseApi } from '../../apis';
import { BaseTableComponent } from '../../../../shared/base-table.component';
import { CourseActionComponent } from '../../dialogs';
import * as _ from 'lodash';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent extends BaseTableComponent {
  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, api: CourseApi, modal: ModalService, toastr: ToastrService) {
    super(injector, api, modal, toastr, route.snapshot.data['fetch']);
    seo.set('Khóa đào tạo');
  }
  init() {
    this.config = {
      size: '550px',
      dialog: CourseActionComponent,
      create: {
        title: 'Thêm mới khóa đào tạo',
        message: {
          success: 'Thêm mới khóa đào tạo thành công',
          error: 'Thêm mới khóa đào tạo không thành công'
        }
      },
      update: {
        title: 'Cập nhật khóa đào tạo',
        message: {
          success: 'Cập nhật khóa đào tạo thành công',
          error: 'Cập nhật khóa đào tạo không thành công'
        }
      },
      view: {
        title: 'Thông tin khóa đào tạo'
      }
    }
    this.cols = ['code', 'name', 'start', 'end', 'status', 'action']
  }

  empty() {
    return {
    }
  }

}
