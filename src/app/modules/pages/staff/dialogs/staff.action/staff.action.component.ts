import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../../../../services';
import { EmployeeApi } from '../../../../../apis';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Utils } from '../../../../../utils';

import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-staff-action',
  templateUrl: './staff.action.component.html',
  styleUrls: ['./staff.action.component.scss']
})
export class StaffActionComponent {
  constructor(private ref: MatDialogRef<StaffActionComponent>,
    @Inject(MAT_DIALOG_DATA) private bindings: any, private toastr: ToastrService, private api: EmployeeApi) {
    this.model = _.get(bindings, 'model');
    this.title = _.get(bindings, 'title');
    this.disabled = _.get(bindings, 'disabled');
    this.facutlies = _.get(bindings, 'data.facutlies')
    this.majors = _.get(bindings, 'data.majors')
    this.levels = _.get(bindings, 'data.levels')
  }
  title: string;
  model: any;
  disabled: boolean;
  loading: boolean
  facutlies: Array<any>
  levels: Array<any>
  majors: Array<any>

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
