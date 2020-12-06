import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { ReportApi } from '../../../../../apis';
import * as _ from 'lodash';
import { Utils } from '../../../../../utils';
import * as moment from 'moment'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-intership-report-by-classroom',
  templateUrl: './intership-report-by-classroom.component.html',
  styleUrls: ['./intership-report-by-classroom.component.scss']
})
export class IntershipReportByClassroomComponent {

  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, private api: ReportApi, private toastr: ToastrService) {
    seo.set('Báo cáo');
    this.classrooms = _.get(route.snapshot.data, 'classrooms')
    this.cols = ['code', 'name', 'dob', 'center', 'facutly', 'major', 'class', 'start', 'end']
    this.model = { is_all_classroom: true }
  }
  classrooms: Array<any>;
  entities: Array<any>;
  cols: Array<string>
  code: string
  model: {
    is_all_classroom: boolean,
    classroom_codes?: Array<string>,
    start?: string,
    end?: string
  }
  @ViewChild('TABLE') table: ElementRef;

  fetch() {
    if (!this.validate()) {
      return;
    }
    this.api.post(`intershipbyclassroom`, this.model).then((response: Array<any>) => {
      this.entities = response
    }), () => {
      this.toastr.error('Có lỗi xảy ra trong quá trình truy xuất dữ liệu')
    }
  }

  value(model: any, key: string) {
    return _.get(model, key)
  }

  onIsAllClassroomChange($event) {
    if ($event) {
      this.model.classroom_codes = undefined;
    }
  }

  validate() {
    if (!this.model.is_all_classroom && Utils.isArrayEmpty(this.model.classroom_codes)) {
      this.toastr.error('Lớp không được để trống')
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

  getLength() {
    return _.size(this.entities);
  }

  exportexcel() {
    let fileName = 'Thống kê học viên thực tập theo lớp'
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
