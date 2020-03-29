import { Component, Input, ViewContainerRef, AfterViewInit, ElementRef } from "@angular/core";
import { DoobBaseItemComponent } from './base-item.component';

declare var $: any;

@Component({
    selector: 'db-subitem, [db-subitem]',
    templateUrl: './subitem.component.html',
    styleUrls: ['./subitem.component.scss'],
    host: {
        'class': 'ui dropdown item'
    },
    providers: [{ provide: DoobBaseItemComponent, useExisting: DoobSubItemComponent }]
})
export class DoobSubItemComponent extends DoobBaseItemComponent implements AfterViewInit  {

    TypeName = 'DoobSubItemComponent';

    @Input() name: string;
    @Input() icon: string;
    @Input() on: string = 'hover'

    dropdownElement:any;

    constructor(public viewContainerRef: ViewContainerRef, private elementRef: ElementRef) {
        super()
    }

    ngAfterViewInit() {
        this.dropdownElement = $(this.elementRef.nativeElement);

        this.dropdownElement.dropdown({
            on: this.on
        })
    }

}
