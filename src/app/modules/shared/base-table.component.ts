import { OnInit, AfterViewInit, Injector, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auths';
import { StorageService, ModalService, ToastrService } from '../../services';
import { HttpWrapper } from '../../apis';

import { ConfirmationComponent } from './dialogs/confirmation/confirmation.component';

import * as _ from 'lodash';
import { Utils } from '../../utils';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';

export class BaseTableComponent implements OnInit, AfterViewInit {
  constructor(injector: Injector, public api: HttpWrapper, public modal: ModalService, public toastr: ToastrService, initialize: FetchResult) {
    this.storage = injector.get(StorageService);
    this.router = injector.get(Router);
    this.auth = injector.get(AuthService);
    this.models = new MatTableDataSource(_.get(initialize, 'models') || []);
    this.total = _.get(initialize, 'count') || 0;
    this.count = _.get(initialize, 'models.length') || 0;
    this.page = 1;
    this.quantity = this.storage.resolve(this.router.url) || 10;
    this.cols = [];
    this.def = { filters: {} }
    this.col_filters = [];
  }
  protected router: Router
  def: FetchQuery
  keyword: string

  auth: AuthService
  storage: StorageService
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  _lock: boolean = false;
  page: number;
  quantity: number;
  total: number;
  count: number;
  models: MatTableDataSource<any>;
  loading: boolean
  query: string;
  config: {
    create?: {
      title?: string
      message?: {
        success?: string
        error?: string
      }
    },
    update?: {
      title?: string
      message?: {
        success?: string
        error?: string
      }
    },
    view?: {
      title?: string
      message?: {
        success?: string
        error?: string
      }
    },
    dialog?: Type<{}>
    size?: string
  };
  cols: Array<string>;
  col_filters: Array<string>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((page: PageEvent) => {
      this.storage.resolve(this.router.url, page.pageSize)
      this.fetch({
        page: (page.pageIndex + 1),
        quantity: page.pageSize
      })
    })

    this.sort.sortChange.subscribe(() => {
      this.refresh()
    })
  }

  init() { }

  refresh() {
    this.fetch({
      page: this.page,
      quantity: this.quantity,
      params: this.def
    });
  }

  fetch(value: {
    page: number,
    quantity: number,
    params?: Object
  }) {
    const params = _.merge(this.params(), value.params);
    this.loading = true
    this.api
      .fetch(value.page, value.quantity, this.query, params)
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

  params(): FetchQuery {
    return {
      params: {
        keyword: Utils.isStringEmpty(this.keyword) ? undefined : this.keyword,
        sort_name: _.get(this.sort, 'active'),
        sort_direction: _.get(this.sort, 'direction')
      }
    };
  }

  empty() {
    return {}
  }

  async create() {
    const component = _.get(this.config, 'dialog');
    const conf = _.get(this.config, 'create')
    const size = _.get(this.config, 'size')
    if (Utils.isNull(component) || Utils.isNull(conf)) {
      return
    }
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(component, {
      data: this.empty(),
      title: conf.title,
      message: conf.message
    }, { width: size })
    instance.subscribe((reload) => {
      if (reload) {
        this.refresh();
      }
      this._lock = false;
    })
  }

  async update(model: any) {
    const component = _.get(this.config, 'dialog');
    const conf = _.get(this.config, 'update')
    const size = _.get(this.config, 'size')
    if (Utils.isNull(component) || Utils.isNull(conf)) {
      return
    }
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(component, {
      data: model,
      title: conf.title,
      message: conf.message
    }, { width: size })
    instance.subscribe((reload) => {
      if (reload) {
        this.refresh();
      }
      this._lock = false;
    })
  }

  async view(model: any) {
    const component = _.get(this.config, 'dialog');
    const conf = _.get(this.config, 'view')
    const size = _.get(this.config, 'size')
    if (Utils.isNull(component) || Utils.isNull(conf)) {
      return
    }
    if (this._lock) {
      return
    }
    this._lock = true;
    var instance = await this.modal.show(component, {
      data: model,
      title: conf.title,
      message: conf.message,
      disabled: true
    }, { width: size })
    instance.subscribe((reload) => {
      if (reload) {
        this.refresh();
      }
      this._lock = false;
    })
  }

  async delete(model: any) {
    if (this._lock) {
      return
    }
    this._lock = true;
    const instance = await this.modal.show(ConfirmationComponent, {
      title: 'Xác nhận',
      body: 'Bạn có chắc chắn muốn xóa bản ghi này không?'
    }, { width: '450px' })
    instance.subscribe((state) => {
      if (state) {
        this.api.delete(model.id).then(() => {
          this.toastr.success('Xóa bản ghi thành công')
          this.refresh();
          this._lock = false;
        }, () => {
          this.toastr.error('Xóa bản ghi không thành công')
        });
        return;
      }
      this._lock = false;
    })
  }

  async published(model: any) {
    if (this._lock) {
      return
    }
    this._lock = true;
    this.api.published(model.id).then(() => {
      this.toastr.success('Xuất bản bản ghi thành công')
      this.refresh();
      this._lock = false;
    }, () => {
      this.toastr.error('Xuất bản bản ghi không thành công')
      this._lock = false;
    });
  }

  async unpublished(model: any) {
    if (this._lock) {
      return
    }
    this._lock = true;
    this.api.unpublished(model.id).then(() => {
      this.toastr.success('Ngừng xuất bản bản ghi thành công')
      this.refresh();
      this._lock = false;
    }, () => {
      this.toastr.error('Ngừng xuất bản bản ghi không thành công')
      this._lock = false;
    });
  }

  value(model: any, key: string) {
    return _.get(model, key)
  }

  value_to_json(model: any, key: string,) {
    return _.get(model, key)
  }

  subscribe(instance: Observable<boolean>) {
    instance.subscribe((reload) => {
      if (reload) {
        this.refresh();
      }
      this._lock = false;
    })
  }
}
