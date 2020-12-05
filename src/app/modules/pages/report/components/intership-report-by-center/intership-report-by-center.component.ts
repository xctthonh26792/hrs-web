import { Component, Injector, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { ReportApi } from '../../../../../apis';
import * as _ from 'lodash';
import { Utils } from '../../../../../utils';
import * as moment from 'moment'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-intership-report-by-center',
  templateUrl: './intership-report-by-center.component.html',
  styleUrls: ['./intership-report-by-center.component.scss']
})
export class IntershipReportByCenterComponent {

  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, private api: ReportApi, private toastr: ToastrService) {
    seo.set('Báo cáo');
    this.centers = _.get(route.snapshot.data, 'centers')
    this.cols = ['code', 'name', 'dob', 'center', 'facutly', 'major', 'class', 'start', 'end']
    this.model = { is_all_center: true }
  }
  centers: Array<any>;
  entities: Array<any>;
  cols: Array<string>
  code: string
  model: {
    is_all_center: boolean,
    center_codes?: Array<string>,
    start?: string,
    end?: string
  }
  @ViewChild('TABLE') table: ElementRef;

  fetch() {
    if (!this.validate()) {
      return;
    }
    this.api.post(`intershipbycenter`, this.model).then((response: Array<any>) => {
      this.entities = response
    }), () => {
      this.toastr.error('Có lỗi xảy ra trong quá trình truy xuất dữ liệu')
    }
  }

  value(model: any, key: string) {
    return _.get(model, key)
  }

  onIsAllCenterChange($event) {
    if ($event) {
      this.model.center_codes = undefined;
    }
  }

  getLength() {
    return _.size(this.entities);
  }

  validate() {
    if (!this.model.is_all_center && Utils.isArrayEmpty(this.model.center_codes)) {
      this.toastr.error('Đơn vị không được để trống')
      return false
    }
    if (Utils.isStringEmpty(this.model.start)) {
      this.toastr.error('Ngày bắt đầu không được để trống')
      return false
    }
    if (Utils.isStringEmpty(this.model.end)) {
      this.toastr.error('Ngày kết thúc không được để trống')
      return false
    }
    if (Utils.isNotNull(this.model.start) && typeof this.model.start === 'object' && Utils.isNotNull(this.model.end) && typeof this.model.end === 'object') {
      var start = moment(this.model.start).format('YYYY-MM-DD')
      var end = moment(this.model.end).format('YYYY-MM-DD')
      if (start > end) {
        this.toastr.error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc')
        return false
      }
    }
    return true
  }
  exportexcel() {
    let fileName = 'Thống kê  thực tập theo đơn vị'
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement, { raw: true });
    ws["!cols"] = [
      { width: 15 },
      { width: 20 },
      { width: 15 },
      { width: 20 },
      { width: 15 },
      { width: 20 },
      { width: 20 },
      { width: 15 },
      { width: 15 }
    ]
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
