import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Injector } from '@angular/core';

export class TenjinComponent implements ControlValueAccessor {
    value: any;
    protected onChange: (value: any) => void;
    protected onTouched: () => void;
    setValue(value: any) {
        this.onChange(value);
    }
    writeValue(value: string): void {
        this.value = value;
    }
    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    normalize(value: any) {
        return value
    }
}
