import { Directive, Output, EventEmitter, ElementRef, AfterViewInit } from "@angular/core";

@Directive({
    selector: '[dbAfterViewInit]'
})
export class DoobAfterViewInitDirective implements AfterViewInit  {

    @Output()
    doobAfterViewInit: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

    constructor(private elementRef: ElementRef) {

    }

    ngAfterViewInit() {
        this.doobAfterViewInit.emit(this.elementRef);
    }

}
