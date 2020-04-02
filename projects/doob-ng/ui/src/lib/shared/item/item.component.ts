import { Component, Input, HostBinding, ViewContainerRef } from "@angular/core";
import { DoobBaseItemComponent } from './base-item.component';


@Component({
    selector: 'db-item, [db-item]',
    templateUrl: './item.component.html',
    host: {
        'class': 'item'
    },
    providers: [{ provide: DoobBaseItemComponent, useExisting: DoobItemComponent }]
})
export class DoobItemComponent  extends DoobBaseItemComponent  {

    TypeName = 'DoobItemComponent';

    @Input()
    set ParentComponent(value: string) {

    }

    @Input() description: string;
    @Input() icon: string;

    // @Input()
    // @HostBinding('attr.data-value') value: any

    constructor(public viewContainerRef: ViewContainerRef) {
        super()
    }

    ngOnInit() {
        //this.dataValue = this.value;
    }

}
