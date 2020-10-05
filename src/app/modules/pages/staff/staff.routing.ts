import { Routes } from '@angular/router';
import { StaffComponent, StudentComponent, IntershipComponent, EmployeeCourseComponent } from './components';
import { AuthGuard, AUTH_ROLE } from '../../../auths'

import {
  StaffResolve,
  EmployeeDataResolve,
  StudentResolve,
  IntershipResolve,
  IntershipDataResolve,
  EmployeeCourseResolve,
  EmployeeCourseDataResolve,
  StudentDataResolve
} from './resolvers'

export const routes: Routes = [
  {
    path: 'staff',
    component: StaffComponent,
    resolve: {
      fetch: StaffResolve,
      data: EmployeeDataResolve
    },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM, AUTH_ROLE.STAFF]
    }
  },
  {
    path: 'student',
    component: StudentComponent,
    resolve: {
      fetch: StudentResolve,
      data: StudentDataResolve
    },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM, AUTH_ROLE.STAFF]
    }
  },
  {
    path: 'intership',
    component: IntershipComponent,
    resolve: {
      fetch: IntershipResolve,
      data: IntershipDataResolve
    },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM, AUTH_ROLE.STAFF]
    }
  },
  {
    path: 'employee-course',
    component: EmployeeCourseComponent,
    resolve: {
      fetch: EmployeeCourseResolve,
      data: EmployeeCourseDataResolve
    },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM, AUTH_ROLE.STAFF]
    }
  }
];
