import { Component, ViewEncapsulation, forwardRef, ChangeDetectorRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { TenjinComponent } from '../p-control.component';
import moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';

const DISPLAY_FORMAT: string = 'DD/MM/YYYY';
const VALUE_FORMAT: string = 'YYYY-MM-DD';

@Component({
    selector: 'p-date',
    templateUrl: './p-date.component.html',
    styleUrls: ['./p-date.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TenjinDateComponent),
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
export class TenjinDateComponent extends TenjinComponent implements AfterViewInit {
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
}
