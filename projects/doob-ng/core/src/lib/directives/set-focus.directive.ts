import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
    selector: '[dbSetFocus]'
})
export class DoobSetFocusDirective implements AfterViewInit {

    @Input()
    doobSetFocus: boolean | number;

    constructor(private elementRef: ElementRef) {

    }

    ngAfterViewInit(): void {
        const focus = (this.doobSetFocus != null && this.doobSetFocus !== undefined) ? this.doobSetFocus : true;

        if (focus) {
            let timeout = 10;
            if(typeof focus === 'number') {
                timeout = focus;
            }
            setTimeout(() => this.elementRef.nativeElement.focus(), timeout);
        }
    }


}
