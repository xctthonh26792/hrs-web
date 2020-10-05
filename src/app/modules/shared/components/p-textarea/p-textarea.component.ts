import { Component, ViewEncapsulation, forwardRef, Input, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { TenjinComponent } from '../p-control.component';

@Component({
    selector: 'p-textarea',
    templateUrl: './p-textarea.component.html',
    styleUrls: ['./p-textarea.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TenjinTextareaComponent),
            multi: true
        }
    ]
})
export class TenjinTextareaComponent extends TenjinComponent implements AfterViewInit {
    @ViewChild(MatInput) control: MatInput;
    @Input() name: string;
    @Input() placeholder: string;
    @Input() disabled: boolean;
    @Input() rows: number;
    @Input() resize: string;
    @Input() required: boolean;
    @Input() trim: boolean;
    @Input('fxFlex') flex: boolean;

    constructor(private ref: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        this.ref.detectChanges()
    }

    blur($event: any) {
        this.value = this.normalize(this.value);
    }

    normalize(value: string) {
        return (this.trim !== null && this.trim !== undefined) ? (value || '').trim() : value;
    }
}
