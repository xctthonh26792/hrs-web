import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../../../../services';
import { FacutlyApi } from '../../../../../apis';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { Utils } from '../../../../../utils';


@Component({
  selector: 'app-facutly.action',
  templateUrl: './facutly.action.component.html',
  styleUrls: ['./facutly.action.component.scss']
})
export class FacutlyActionComponent {

  constructor(private ref: MatDialogRef<FacutlyActionComponent>,
    @Inject(MAT_DIALOG_DATA) private bindings: any, private toastr: ToastrService, private api: FacutlyApi) {
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
