import { Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Utils } from '../utils';

@Pipe({
    name: 'isStringEmpty',
    pure: false
})
export class IsStringEmptyPipe implements PipeTransform {
    transform(value: string) {
        return Utils.isStringEmpty(value);
    }
}

@Pipe({
    name: 'isStringNotEmpty',
    pure: false
})
export class IsStringNotEmptyPipe implements PipeTransform {
    transform(value: string) {
        return Utils.isStringNotEmpty(value);
    }
}