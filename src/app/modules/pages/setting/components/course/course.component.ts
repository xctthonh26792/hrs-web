import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { CourseApi } from '../../apis';
import { BaseTableComponent } from '../../../../shared/base-table.component';
import { CourseActionComponent } from '../../dialogs';
import * as _ from 'lodash';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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


  ngAfterViewInit() {
    this.paginator.page.subscribe((page: PageEvent) => {
      this.storage.resolve(this.router.url, page.pageSize)
      this.fetch({
        page: (page.pageIndex + 1),
        quantity: page.pageSize,
        query: this.query
      })
    })

    this.sort.sortChange.subscribe(() => {
      this.refresh()
    })
  }

  refresh() {
    this.fetch({
      page: this.page,
      quantity: this.quantity,
      query: this.query
    });
  }

  fetch(value: {
    page: number,
    quantity: number,
    query: string
  }) {
    this.loading = true
    this.api
      .post('all-course', {
        page: value.page,
        quantity: value.quantity,
        query: this.query
      })
      .then((response: FetchResult) => {
        this.total = response.count;
        this.models = new MatTableDataSource(response.models);
        this.count = response.models.length;
        this.page = value.page;
        this.quantity = value.quantity;
        // this.defparams = value.params;
      }).then(() => {
        this.loading = false
      });
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
    this.cols = ['code', 'name', 'start', 'end', 'course_time', 'status', 'action']
  }

  search(value: string) {
    this.fetch({ page: this.page, quantity: this.quantity, query: value })
  }

  empty() {
    return {
    }
  }

}
