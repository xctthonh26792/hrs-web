import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxSummernoteDirective } from './ngx-summernote.directive';
import { NgxSummernoteViewDirective } from './ngx-summernote-view.directive';

@NgModule({
  declarations: [
    NgxSummernoteDirective,
    NgxSummernoteViewDirective
  ],
  exports: [
    NgxSummernoteDirective,
    NgxSummernoteViewDirective
  ]
})
export class NgxSummernoteModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: NgxSummernoteModule, providers: [] };
  }

  public static forChild(): ModuleWithProviders<NgxSummernoteModule> {
    return {
      ngModule: NgxSummernoteModule,
    };
  }
}
