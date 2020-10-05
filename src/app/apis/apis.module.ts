import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeApi } from './employee.api';
import { UserApi } from './user.api';
import { StudentApi } from './student.api'
import { CenterApi } from './center.api'
import { ReportApi } from './report.api'
import { FacutlyApi } from './facutly.api'
import { DashboardApi } from './dashboard.api'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ApisModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ApisModule,
      providers: [
        EmployeeApi,
        UserApi,
        StudentApi,
        CenterApi,
        ReportApi,
        FacutlyApi,
        DashboardApi
      ]
    };
  }
}
