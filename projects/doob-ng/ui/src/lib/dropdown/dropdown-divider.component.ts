import { Component, ViewContainerRef } from "@angular/core";
import { DoobBaseComponent } from './base.component';

@Component({
    selector: 'db-dropdown-divider',
    template: '<div> </div>',
    providers: [{ provide: DoobBaseComponent, useExisting: DoobDropdownDividerComponent }],
    host: {
        'class': 'divider'
    },
    styles: [`

    :host {
        display: block
    }

    `],
})
export class DoobDropdownDividerComponent {

    constructor(public viewContainerRef: ViewContainerRef) {

    }
}
