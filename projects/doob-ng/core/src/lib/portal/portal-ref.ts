import { ViewContainerRef } from '@angular/core';

export class PortalRef {

    OnSet: () => void;

    constructor(public viewContainerRef: ViewContainerRef) {

    }
}


