import { Component, Injector, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { ReportApi } from '../../../../../apis';
import * as _ from 'lodash';
import { Utils } from '../../../../../utils';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-intership-report-by-student',
  templateUrl: './intership-report-by-student.component.html',
  styleUrls: ['./intership-report-by-student.component.scss']
})
export class IntershipReportByStudentComponent {

  constructor(injector: Injector, seo: SeoService, route: ActivatedRoute, private api: ReportApi, private toastr: ToastrService) {
    seo.set('Báo cáo');
    this.students = _.get(route.snapshot.data, 'students')
    this.cols = ['code', 'name', 'dob', 'facutly', 'major', 'class', 'start', 'end']
  }
  students: Array<any>;
  entities: Array<any>;
  cols: Array<string>
  code: string
  @ViewChild('TABLE') table: ElementRef;

  fetch() {
    if (Utils.isStringEmpty(this.code)) {
      this.toastr.error('Học viên không được để trống')
      return
    }
    this.api.get(`intershipbystudent/${this.code}`).then((response: Array<any>) => {
      this.entities = response
    }), () => {
      this.toastr.error('Có lỗi xảy ra trong quá trình truy xuất dữ liệu')
    }
  }

  value(model: any, key: string) {
    return _.get(model, key)
  }

  getLength() {
    return _.size(this.entities);
  }

  exportexcel() {
    let fileName = 'Thống kê học viên thực tập'
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement, { raw: true });
    ws["!cols"] = [
      { width: 15 },
      { width: 20 },
      { width: 15 },
      { width: 20 },
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
