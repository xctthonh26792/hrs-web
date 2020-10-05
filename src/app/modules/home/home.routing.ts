import { Routes } from '@angular/router';
import { AuthGuard } from '../../auths';

import {
  LoginComponent,
  NotFoundComponent,
  UnauthorizedComponent,
  HomeComponent
} from './components';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('../pages/dashboard/dashboard.module').then(x => x.DashboardModule) },
      {
        path: '', loadChildren: () => import('../pages/staff/staff.module').then(x => x.StaffModule)
      },
      {
        path: '', loadChildren: () => import('../pages/setting/setting.module').then(x => x.SettingModule)
      },
      {
        path: '', loadChildren: () => import('../pages/report/report.module').then(x => x.ReportModule)
      }
    ]
  },
  { path: '**', redirectTo: 'not-found' }
];
