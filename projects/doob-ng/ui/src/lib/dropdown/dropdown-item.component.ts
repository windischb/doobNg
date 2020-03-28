import { Component, Input, HostBinding, ViewContainerRef } from "@angular/core";
import { DoobBaseComponent } from './base.component';

@Component({
    selector: 'db-dropdown-item',
    templateUrl: './dropdown-item.component.html',
    host: {
        'class': 'item'
    },
    providers: [{ provide: DoobBaseComponent, useExisting: DoobDropdownItemComponent }]
})
export class DoobDropdownItemComponent {

    TypeName = 'DoobDropdownItemComponent';


    //@Input() value: any;
    @Input() description: string;
    @Input() icon: string;
    @Input() type: null | "divider" | "submenu" = null;

    @Input()
    @HostBinding('attr.data-value') value: any

    constructor(public viewContainerRef: ViewContainerRef) {

    }

    ngOnInit() {
        //this.dataValue = this.value;
    }

}
