import { Routes } from '@angular/router';
import {
  DashboardComponent,
} from './components';

import { DashboardResolve } from './resolvers';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: { data: DashboardResolve },
  }
];
