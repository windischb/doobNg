import { Component, ViewContainerRef, Input } from "@angular/core";
import { DoobBaseItemComponent } from './base-item.component';

@Component({
    selector: 'db-divider',
    template: '<div> </div>',
    providers: [{ provide: DoobBaseItemComponent, useExisting: DoobDividerComponent }],
    host: {
        'class': 'divider'
    },
    styles: [`

    :host {
        display: block
    }

    `],
})
export class DoobDividerComponent extends DoobBaseItemComponent {

    @Input() ParentComponent: string;

    TypeName: string = 'DoobDividerComponent';

    constructor(public viewContainerRef: ViewContainerRef) {
        super()
    }

}
