import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../../../../services';
import { StudentApi } from '../../../../../apis';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Utils } from '../../../../../utils';
import * as _ from 'lodash';


@Component({
  selector: 'app-student.action',
  templateUrl: './student.action.component.html',
  styleUrls: ['./student.action.component.scss']
})
export class StudentActionComponent {

  constructor(private ref: MatDialogRef<StudentActionComponent>,
    @Inject(MAT_DIALOG_DATA) private bindings: any, private toastr: ToastrService, private api: StudentApi) {
    this.model = _.get(bindings, 'model');
    this.title = _.get(bindings, 'title');
    this.disabled = _.get(bindings, 'disabled');
    this.centers = _.get(bindings, 'data.centers')
    this.majors = _.get(bindings, 'data.majors')
  }
  title: string;
  model: any;
  disabled: boolean;
  loading: boolean
  centers: Array<any>
  majors: Array<any>;

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
