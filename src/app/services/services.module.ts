import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrService } from './toastr.service';
import { LoadingService } from './loading.service';
import { SeoService } from './seo.service';
import { StorageService } from './storage.service';
import { DownloadService } from './download.service';
import { ModalService } from './modal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  entryComponents: []
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        ToastrService,
        LoadingService,
        SeoService,
        StorageService,
        DownloadService,
        ModalService,
      ]
    };
  }
}
