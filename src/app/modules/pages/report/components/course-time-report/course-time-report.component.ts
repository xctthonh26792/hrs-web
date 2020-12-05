import { Component, Injector, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { ReportApi } from '../../../../../apis';
import * as _ from 'lodash';
import { Utils } from '../../../../../utils';
import * as XLSX from 'xlsx'
import * as moment from 'moment'


@Component({
  selector: 'app-course-time-report',
  templateUrl: './course-time-report.component.html',
  styleUrls: ['./course-time-report.component.scss']
})
export class CourseTimeReportComponent {

  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, private api: ReportApi, private toastr: ToastrService) {
    seo.set('Báo cáo');
    this.facutlies = _.get(route.snapshot.data, 'facutlies')
    this.cols = ['code', 'name', 'dob', 'facutly', 'major', 'total_time']
    this.model = { is_all_facutly: true }
  }
  facutlies: Array<any>;
  entities: Array<any>;
  cols: Array<string>
  model: {
    is_all_facutly: boolean,
    facutly_codes?: Array<string>,
    start?: string,
    end?: string
  }

  @ViewChild('TABLE') table: ElementRef;

  fetch() {
    this.api.post(`coursetime`, this.model).then((response: Array<any>) => {
      this.entities = response
    }), () => {
      this.toastr.error('Có lỗi xảy ra trong quá trình truy xuất dữ liệu')
    }
  }

  onIsAllFacutlyChange($event) {
    if ($event) {
      this.model.facutly_codes = undefined;
    }
  }

  getTotalTime() {
    var vals = _.map(this.entities, x => x.total_time !== undefined ? x.total_time : 0);
    return _.reduce(vals, (acc, value) => acc + value, 0);
  }

  value(model: any, key: string) {
    return _.get(model, key)
  }

  validate() {
    if (!this.model.is_all_facutly && Utils.isArrayEmpty(this.model.facutly_codes)) {
      this.toastr.error('Khoa không được để trống')
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
    let fileName = 'Thống kê số giờ đào tạo của nhân viên'
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement, { raw: true });
    ws["!cols"] = [
      { width: 15 },
      { width: 20 },
      { width: 15 },
      { width: 20 },
      { width: 20 },
      { width: 20 }
    ]
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
