import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService, ModalService } from '../../../../../services';
import { IntershipApi } from '../../apis';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload'
import * as _ from 'lodash';

@Component({
  selector: 'app-intership.upload',
  templateUrl: './intership.upload.component.html',
  styleUrls: ['./intership.upload.component.scss'],
  providers: [IntershipApi]
})
export class IntershipUploadComponent {

  constructor(private ref: MatDialogRef<IntershipUploadComponent>,
    @Inject(MAT_DIALOG_DATA) private bindings: any, private toastr: ToastrService, private api: IntershipApi, private modal: ModalService) {
    this.uploader = new FileUploader({ itemAlias: 'file', allowedFileType: ['xlsx', 'xls'] })
    this.url = '/assets/templates/intership.xlsx'
  }


  loading: boolean;
  url: string;
  uploader: FileUploader;
  errors: Array<any>;
  exception: boolean;

  accept(form: NgForm) {
    if (form.invalid) { return; }
    this.save()
    return
  }

  save() {
    this.exception = false
    if (this.loading) { return; }
    this.loading = true;
    const form = new FormData()
    form.append('file', _.chain(this.uploader.queue).last().value().file.rawFile);
    this.api.post('import', form).then(() => {
      this.toastr.success(_.get(this.bindings, 'message.success'));
      this.ref.close(true)
    }, async (response) => {
      this.errors = _.get(response, 'error.errors')
      this.exception = true
      this.toastr.error(_.get(this.bindings, 'message.error'));
    }).then(() => {
      this.loading = false;
    });
  }

  cancel() {
    this.ref.close(false)
  }
}
