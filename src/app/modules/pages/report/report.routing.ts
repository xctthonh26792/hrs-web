import { Routes } from '@angular/router';

import { IntershipReportByStudentComponent, CourseReportByEmployeeComponent, IntershipReportByCenterComponent, IntershipReportByFacutlyComponent, CourseReportByFacutlyComponent, CourseTimeReportComponent, CourseByCourseComponent, IntershipReportByClassroomComponent } from './components'
import { } from './resolvers'
import {
  CenterSelectizeResolve,
  FacutlySelectizeResolve,
  EmployeeSelectizeResolve,
  StudentSelectizeResolve,
  CourseSelectizeResolve,
  ClassroomSelectizeResolve
} from '../../shared/resolvers'

import { AUTH_ROLE, AuthGuard } from '../../../auths'

export const routes: Routes = [
  {
    path: 'course-report-by-employee',
    component: CourseReportByEmployeeComponent,
    resolve: { employees: EmployeeSelectizeResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
    }
  },
  {
    path: 'course-report-by-facutly',
    component: CourseReportByFacutlyComponent,
    resolve: { facutlies: FacutlySelectizeResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
    }
  },
  {
    path: 'course-report-by-course',
    component: CourseByCourseComponent,
    resolve: { courses: CourseSelectizeResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
    }
  },
  {
    path: 'intership-report-by-student',
    component: IntershipReportByStudentComponent,
    resolve: { students: StudentSelectizeResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
    }
  },

  {
    path: 'intership-report-by-center',
    component: IntershipReportByCenterComponent,
    resolve: { centers: CenterSelectizeResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
    }
  },
  {
    path: 'intership-report-by-facutly',
    component: IntershipReportByFacutlyComponent,
    resolve: { facutlies: FacutlySelectizeResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
    }
  },
  {
    path: 'intership-report-by-classroom',
    component: IntershipReportByClassroomComponent,
    resolve: { classrooms: ClassroomSelectizeResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
    }
  },
  {
    path: 'course-time',
    component: CourseTimeReportComponent,
    resolve: { facutlies: FacutlySelectizeResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.STAFF, AUTH_ROLE.SYSTEM]
    }
  },
];
