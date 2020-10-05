import { Component, ViewEncapsulation, forwardRef, ChangeDetectorRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { TenjinComponent } from '../p-control.component';
import * as _ from 'lodash';

@Component({
  selector: 'p-percent',
  templateUrl: './p-percent.component.html',
  styleUrls: ['./p-percent.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TenjinPercentComponent),
      multi: true
    },
  ]
})
export class TenjinPercentComponent extends TenjinComponent implements AfterViewInit {
  @ViewChild(MatInput) control: MatInput;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() negative: boolean = false;
  @Input() separator: number = 0
  @Input() min: number
  @Input() max: number
  @Input('fxFlex') flex: boolean;

  constructor(private ref: ChangeDetectorRef) {
    super();
  }

  setValue(value: any) {
    this.onChange(isNaN(Number(value)) ? undefined : Number(value) / 100);
  }

  writeValue(value): void {
    this.value = value * 100;
  }

  get pattern() {
    return `separator.${Math.max(this.separator, 0)}`
  }

  get errors() {
    return _.get(this.control, 'ngControl.errors');
  }

  ngAfterViewInit() {
    this.ref.detectChanges();
  }

  blur($event: any) {
    this.value = this.normalize(this.value);
  }

  normalize(value: any) {
    return isNaN(Number(value)) ? undefined : Number(value)
  }
}
