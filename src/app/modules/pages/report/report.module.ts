import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../../pipes';
import { DirectivesModule } from '../../../directives';

import { SharedModule } from '../../shared/shared.module';

import { COMPONENTS } from './components';
import { RESOLVERS } from './resolvers';

import { routes } from './report.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    DirectivesModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [...RESOLVERS],
  exports: [RouterModule],
  declarations: [...COMPONENTS],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportModule { }
