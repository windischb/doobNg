import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
    selector: '[dbSetFocus]'
})
export class DoobSetFocusDirective implements AfterViewInit {

    @Input()
    dbSetFocus: boolean | number;

    constructor(private elementRef: ElementRef) {

    }

    ngAfterViewInit(): void {
        const focus = (this.dbSetFocus != null && this.dbSetFocus !== undefined) ? this.dbSetFocus : true;

        if (focus) {
            let timeout = 10;
            if(typeof focus === 'number') {
                timeout = focus;
            }
            setTimeout(() => this.elementRef.nativeElement.focus(), timeout);
        }
    }


}
