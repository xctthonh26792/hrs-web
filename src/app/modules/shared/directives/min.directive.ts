import { Directive, Input, forwardRef } from '@angular/core'
import { NG_VALIDATORS, Validator, AbstractControl, Validators, ValidationErrors } from '@angular/forms'
import * as _ from 'lodash';

@Directive({
  selector: '[min]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinDirective, multi: true }]
})
export class MinDirective implements Validator {
  @Input() min: number;
  validate(control: AbstractControl): { [key: string]: any } {
    if (this.min === 0) {
      return null;
    }
    const value = parseFloat(control.value);
    return !_.isNaN(value) && value < this.min ? { 'min': { 'min': this.min, 'actual': control.value } } : null;
  }
}