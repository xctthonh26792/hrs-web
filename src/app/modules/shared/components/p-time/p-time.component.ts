import { Component, ViewEncapsulation, forwardRef, ChangeDetectorRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { TenjinComponent } from '../p-control.component';
import moment from 'moment';
import { AmazingTimePickerService } from '../../../../plugins/amazing-time-picker';

@Component({
    selector: 'p-time',
    templateUrl: './p-time.component.html',
    styleUrls: ['./p-time.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TenjinTimeComponent),
            multi: true
        }
    ]
})
export class TenjinTimeComponent extends TenjinComponent implements AfterViewInit {
    @ViewChild(MatInput) control: MatInput;
    @Input() name: string
    @Input() placeholder: string
    @Input() format: string = 'HH:mm'
    @Input() disabled: boolean
    @Input() required: boolean
    @Input('fxFlex') flex: boolean
    constructor(private ref: ChangeDetectorRef, private service: AmazingTimePickerService) {
        super();
    }

    ngAfterViewInit() {
        this.ref.detectChanges();
    }

    blur($event: any) {
        this.refactor(this.value);
    }

    open($event: any) {
        this.service.open({ time: this.value })
            .afterClose()
            .subscribe((value) => {
                this.refactor(value)
            });
    }

    refactor(value: moment.MomentInput) {
        this.value = moment(value, this.format).isValid() ? moment(value, this.format).format(this.format) : undefined
        this.setValue(this.value)
    }
}
