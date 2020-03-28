import { Directive, Output, EventEmitter, ElementRef, AfterViewInit } from "@angular/core";

@Directive({
    selector: '[dbAfterViewInit]'
})
export class DoobAfterViewInitDirective implements AfterViewInit  {

    @Output()
    dbAfterViewInit: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

    constructor(private elementRef: ElementRef) {

    }

    ngAfterViewInit() {
        this.dbAfterViewInit.emit(this.elementRef);
    }

}
