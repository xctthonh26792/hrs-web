import { Directive, Input, forwardRef } from '@angular/core'
import { NG_VALIDATORS, Validator, AbstractControl, Validators, ValidationErrors } from '@angular/forms'
import * as _ from 'lodash';

@Directive({
  selector: '[max]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxDirective, multi: true }]
})
export class MaxDirective implements Validator {
  @Input() max: number;
  validate(control: AbstractControl): { [key: string]: any } {
    if (this.max === 0) {
      return null;
    }
    const value = parseFloat(control.value);
    return !_.isNaN(value) && value > this.max ? { 'max': { 'max': this.max, 'actual': control.value } } : null;
  }
}