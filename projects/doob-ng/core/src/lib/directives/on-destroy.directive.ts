import { Directive, Output, EventEmitter, ElementRef, OnInit, OnDestroy } from "@angular/core";

@Directive({
    selector: '[doobOnDestroy]'
})
export class DoobOnDestroyDirective implements OnDestroy {

    @Output()
    doobOnDestroy: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

    constructor(private elementRef: ElementRef) {

    }

    ngOnDestroy() {
        this.doobOnDestroy.emit(this.elementRef);
    }

}
