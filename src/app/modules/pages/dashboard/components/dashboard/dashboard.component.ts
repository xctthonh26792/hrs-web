import { Component, Injector, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService, ModalService, ToastrService } from '../../../../../services';
import { ReportApi } from '../../../../../apis';
import * as _ from 'lodash';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private seo: SeoService, private route: ActivatedRoute) {
    seo.set('Bảng điều khiển');
    this.data = _.get(route.snapshot.data, 'data')
  }
  data: {
    total_student: number,
    total_employee: number,
    total_course: number,
    total_intership: number
  }
}
