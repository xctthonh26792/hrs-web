import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../../pipes';
import { DirectivesModule } from '../../../directives';

import { SharedModule } from '../../shared/shared.module';

import { APIS } from './apis'
import { COMPONENTS } from './components';
import { DIALOGS } from './dialogs';
import { RESOLVERS } from './resolvers';

import { routes } from './setting.routing';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    DirectivesModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [...APIS, ...RESOLVERS],
  exports: [RouterModule],
  declarations: [...COMPONENTS, ...DIALOGS],
  entryComponents: [...DIALOGS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingModule { }
