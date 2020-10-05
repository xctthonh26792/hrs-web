import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../../../../services';
import { EmployeeCourseApi } from '../../apis';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { Utils } from '../../../../../utils'
import * as moment from 'moment'


@Component({
  selector: 'app-employee-course.action',
  templateUrl: './employee-course.action.component.html',
  styleUrls: ['./employee-course.action.component.scss'],
  providers: [EmployeeCourseApi]
})
export class EmployeeCourseActionComponent {

  constructor(private ref: MatDialogRef<EmployeeCourseActionComponent>,
    @Inject(MAT_DIALOG_DATA) private bindings: any, private toastr: ToastrService, private api: EmployeeCourseApi) {
    this.model = _.get(bindings, 'model');
    this.title = _.get(bindings, 'title');
    this.disabled = _.get(bindings, 'disabled');
    this.employees = _.get(bindings, 'data.employees')
    this.courses = _.get(bindings, 'data.courses')
  }
  title: string;
  model: any;
  disabled: boolean;
  loading: boolean
  employees: Array<any>
  courses: Array<any>

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

  courseChange($event) {
    var course = _.chain(this.courses).filter(x => x.id === $event).first().value()
    if (Utils.isNotNull(course)) {
      this.model.start = course.start
      this.model.end = course.end
      this.model.time_start = course.time_start
      this.model.time_end = course.time_end
    }
  }

  cancel() {
    this.ref.close(false)
  }

  employeeChange($event) {
    var employee = _.chain(this.employees).filter(x => x.id === $event).first().value()
    console.log(employee)
    if (Utils.isNotNull(employee)) {
      this.model.facutly_code = employee.facutly_code
      this.model.major_code = employee.major_code

    }
  }
}
