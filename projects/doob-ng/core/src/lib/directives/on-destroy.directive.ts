import { Directive, Output, EventEmitter, ElementRef, OnDestroy } from "@angular/core";

@Directive({
    selector: '[dbOnDestroy]'
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
