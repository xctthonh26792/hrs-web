import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../../../../services';
import { IntershipApi } from '../../apis';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { Utils } from '../../../../../utils'
import * as moment from 'moment'
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';

@Component({
  selector: 'app-intership.aciton',
  templateUrl: './intership.aciton.component.html',
  styleUrls: ['./intership.aciton.component.scss'],
  providers: [IntershipApi]
})
export class IntershipAcitonComponent {

  constructor(private ref: MatDialogRef<IntershipAcitonComponent>,
    @Inject(MAT_DIALOG_DATA) private bindings: any, private toastr: ToastrService, private api: IntershipApi) {
    this.model = _.get(bindings, 'model');
    this.title = _.get(bindings, 'title');
    this.disabled = _.get(bindings, 'disabled');
    this.students = _.get(bindings, 'data.students')
    this.facutlies = _.get(bindings, 'data.facutlies')
  }
  title: string;
  model: any;
  disabled: boolean;
  loading: boolean
  students: Array<any>
  facutlies: Array<any>

  accept(form: NgForm) {
    if (form.invalid) { return; }
    if (!this.validate) { return; }
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
    if (!this.validate) { return; }
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

  validate() {
    if (Utils.isNotNull(this.model.start) && typeof this.model.start === 'object' && Utils.isNotNull(this.model.end) && typeof this.model.end === 'object') {
      var start = moment(this.model.start).format('YYYY-MM-DD')
      var end = moment(this.model.end).format('YYYY-MM-DD')
      if (start > end) {
        this.toastr.error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc')
        return false
      }
    }
    return true
  }

  studentChange($event) {
    var student = _.chain(this.students).filter(x => x.id === $event).first().value()
    if (Utils.isNotNull(student)) {
      this.model.center_code = student.center_code
      this.model.class = student.class
      this.model.major_code = student.major_code
      this.model.course = student.course
    }
  }
}
