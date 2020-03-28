import { Component, AfterViewInit, ElementRef, Input, EventEmitter } from "@angular/core";


declare var $: any;

@Component({
    selector: 'db-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    host: {
        class: 'ui accordion'
    },
})
export class DoobAccordionComponent implements AfterViewInit {

    private _open: boolean = false;
    @Input()
    set open(value: boolean) {
        this._open = !!value;
        if(this._open) {
            this.accordionElement?.accordion('open', 0)
        } else {
            this.accordionElement?.accordion('close', 0)
        }
    }
    get open() {
        return this._open;
    }
    openChanged$: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() duration: number = 500;

    private accordionElement: any;

    constructor(private elementRef: ElementRef) {

    }



    ngAfterViewInit() {

        this.accordionElement = $(this.elementRef.nativeElement);
        const options = {
            duration: this.duration
        }
        this.accordionElement.accordion(options);
    }
}
