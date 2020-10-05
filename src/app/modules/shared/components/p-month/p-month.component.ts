import { Component, ViewEncapsulation, forwardRef, ChangeDetectorRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { TenjinComponent } from '../p-control.component';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';

const DISPLAY_FORMAT: string = 'MM/YYYY';
const VALUE_FORMAT: string = 'YYYY-MM';

@Component({
    selector: 'p-month',
    templateUrl: './p-month.component.html',
    styleUrls: ['./p-month.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TenjinMonthComponent),
            multi: true
        },
        {
            provide: MAT_DATE_FORMATS, useValue: {
                parse: {
                    dateInput: DISPLAY_FORMAT
                },
                display: {
                    dateInput: DISPLAY_FORMAT,
                    monthYearLabel: 'MMMM Y',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'MMMM Y'
                }
            }
        },
    ]
})
export class TenjinMonthComponent extends TenjinComponent implements AfterViewInit {
    @ViewChild(MatInput) control: MatInput;
    @Input() name: string
    @Input() placeholder: string
    @Input() disabled: boolean
    @Input() required: boolean
    @Input('fxFlex') flex: boolean
    constructor(private ref: ChangeDetectorRef) {
        super();
    }

    setValue(value: any) {
        this.onChange(moment(value).isValid() ? moment(value).format(VALUE_FORMAT) : undefined);
    }

    ngAfterViewInit() {
        this.ref.detectChanges();
    }

    handle(value: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
        this.value = value.format(VALUE_FORMAT)
        this.setValue(value)
        datepicker.close();
    }
}
