import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../../../../services';
import { MajorApi } from '../../apis';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { Utils } from '../../../../../utils';


@Component({
  selector: 'app-major.action',
  templateUrl: './major.action.component.html',
  styleUrls: ['./major.action.component.scss'],
  providers: [MajorApi]
})
export class MajorActionComponent {

  constructor(private ref: MatDialogRef<MajorActionComponent>,
    @Inject(MAT_DIALOG_DATA) private bindings: any, private toastr: ToastrService, private api: MajorApi) {
    this.model = _.get(bindings, 'data');
    this.title = _.get(bindings, 'title');
    this.disabled = _.get(bindings, 'disabled');
  }

  title: string;
  model: any;
  disabled: boolean;
  loading: boolean

  accept(form: NgForm) {
    if (form.invalid) { return; }
    if (!this.disabled) {
      if (Utils.isStringEmpty(this.model.id)) {
        this.save()
        return
      }
      this.update()
      return
    }
    this.cancel()
  }

  save() {
    if (this.loading) { return; }
    this.loading = true;
    this.api.save(this.model).then(() => {
      this.toastr.success(_.get(this.bindings, 'message.success'));
      this.ref.close(true)
    }, () => {
      this.toastr.error(_.get(this.bindings, 'message.error'));
    }).then(() => {
      this.loading = false;
    });
  }

  update() {
    if (this.loading) { return; }
    this.loading = true;
    this.api.update(this.model).then(() => {
      this.toastr.success(_.get(this.bindings, 'message.success'));
      this.ref.close(true)
    }, () => {
      this.toastr.error(_.get(this.bindings, 'message.error'));
    }).then(() => {
      this.loading = false;
    });
  }

  cancel() {
    this.ref.close(false)
  }

}
