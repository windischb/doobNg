import { Directive, Output, EventEmitter, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[dbOnInit]'
})
export class DoobOnInitDirective implements OnInit {

    @Output()
    doobOnInit: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

    constructor(private elementRef: ElementRef) {

    }

    ngOnInit() {
        this.doobOnInit.emit(this.elementRef);
    }

}
