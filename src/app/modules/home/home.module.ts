import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes';
import { DirectivesModule } from '../../directives';
import { SharedModule } from '../shared/shared.module';

import { NgxMaskModule } from '../../plugins/ngx-mask'
import { NgxSummernoteModule } from '../../plugins/ngx-summernote'

import { COMPONENTS } from './components';
import { DIALOGS } from './dialogs';
import { RESOLVERS } from './resolvers';

import { routes } from './home.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    DirectivesModule,
    SharedModule,
    RouterModule.forRoot(routes),
    NgxMaskModule.forChild(),
    NgxSummernoteModule.forChild()
  ],
  providers: [...RESOLVERS],
  exports: [RouterModule],
  declarations: [...COMPONENTS, ...DIALOGS],
  entryComponents: [...DIALOGS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
