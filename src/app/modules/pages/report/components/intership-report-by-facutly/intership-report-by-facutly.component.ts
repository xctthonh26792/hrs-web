import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { ReportApi } from '../../../../../apis';
import * as _ from 'lodash';
import { Utils } from '../../../../../utils';
import * as moment from 'moment'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-intership-report-by-facutly',
  templateUrl: './intership-report-by-facutly.component.html',
  styleUrls: ['./intership-report-by-facutly.component.scss']
})
export class IntershipReportByFacutlyComponent {

  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, private api: ReportApi, private toastr: ToastrService) {
    seo.set('Báo cáo');
    this.facutlies = _.get(route.snapshot.data, 'facutlies')
    this.cols = ['code', 'name', 'dob', 'center', 'facutly', 'major', 'class', 'start', 'end']
    this.model = {}
  }
  facutlies: Array<any>;
  entities: Array<any>;
  cols: Array<string>
  code: string
  model: {
    facutly_codes?: Array<string>,
    start?: string,
    end?: string
  }
  @ViewChild('TABLE') table: ElementRef;

  fetch() {
    if (!this.validate()) {
      return;
    }
    this.api.post(`intershipbyfacutly`, this.model).then((response: Array<any>) => {
      this.entities = response
    }), () => {
      this.toastr.error('Có lỗi xảy ra trong quá trình truy xuất dữ liệu')
    }
  }

  value(model: any, key: string) {
    return _.get(model, key)
  }

  validate() {
    if (Utils.isArrayEmpty(this.model.facutly_codes)) {
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
    let fileName = 'Thống kê sinh viên thực tập trong khoa'
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement, { raw: true });
    ws["!cols"] = [
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
