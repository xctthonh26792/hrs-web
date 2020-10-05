import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[p-control]'
})
export class TenjinDirective implements OnInit {
    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        this.configure(this.element.nativeElement.parentElement)
    }

    private configure(element: HTMLElement) {
        let container: HTMLElement = element.parentElement;
        while (element.firstChild) {
            container.insertBefore(element.firstChild, element);
        }
        container.removeChild(element);
    }
}