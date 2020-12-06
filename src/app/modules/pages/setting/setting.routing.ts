import { Routes } from '@angular/router';

import { FacutlyComponent, CenterComponent, MajorComponent, LevelComponent, CourseComponent, ClassroomComponent } from './components'
import { FacutlyResolve, CenterResolve, MajorResolve, LevelResolve, CourseResolve, ClassroomResolve } from './resolvers'
import { AuthGuard, AUTH_ROLE } from '../../../auths'


export const routes: Routes = [
  {
    path: 'facutly',
    component: FacutlyComponent,
    resolve: { fetch: FacutlyResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM]
    }
  },
  {
    path: 'center',
    component: CenterComponent,
    resolve: { fetch: CenterResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM]
    }
  },
  {
    path: 'major',
    component: MajorComponent,
    resolve: { fetch: MajorResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM]
    }
  },
  {
    path: 'level',
    component: LevelComponent,
    resolve: { fetch: LevelResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM]
    }
  },
  {
    path: 'course',
    component: CourseComponent,
    resolve: { fetch: CourseResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM]
    }
  },
  {
    path: 'classroom',
    component: ClassroomComponent,
    resolve: { fetch: ClassroomResolve },
    canActivate: [AuthGuard],
    data: {
      permissions: [AUTH_ROLE.ADMINISTRATOR, AUTH_ROLE.SYSTEM]
    }
  }
];
