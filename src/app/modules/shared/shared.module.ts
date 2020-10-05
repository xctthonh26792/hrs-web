import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxMaskModule } from '../../plugins/ngx-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { MATERIAL_MODULES, MATERIAL_PROVIDERS } from './material.module';
import { COMPONENTS } from './components';
import { DIALOGS } from './dialogs';
import { DIRECTIVES } from './directives'
import { RESOLVERS } from './resolvers';
import { PipesModule } from '../../pipes';
import { NgxSummernoteModule } from '../../plugins/ngx-summernote';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    NgxMatSelectSearchModule,
    NgxMaskModule.forChild(),
    NgxSummernoteModule.forChild(),
    ...MATERIAL_MODULES
  ],
  exports: [
    ...MATERIAL_MODULES,
    ...COMPONENTS,
    ...DIALOGS,
    ...DIRECTIVES,
  ],
  providers: [
    // ...MATERIAL_PROVIDERS,
    ...RESOLVERS,
  ],
  declarations: [
    ...COMPONENTS,
    ...DIALOGS,
    ...DIRECTIVES,
  ],
  entryComponents: [
    ...COMPONENTS,
    ...DIALOGS,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
