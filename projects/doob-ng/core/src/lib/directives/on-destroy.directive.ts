import { Directive, Output, EventEmitter, ElementRef, OnDestroy } from "@angular/core";

@Directive({
    selector: '[dbOnDestroy]'
})
export class DoobOnDestroyDirective implements OnDestroy {

    @Output()
    dbOnDestroy: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

    constructor(private elementRef: ElementRef) {

    }

    ngOnDestroy() {
        this.dbOnDestroy.emit(this.elementRef);
    }

}
