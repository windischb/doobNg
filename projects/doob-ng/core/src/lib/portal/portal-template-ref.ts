import { TemplateRef } from '@angular/core';
export class PortalTemplateRef {
    OnSet: () => void;
    constructor(public templateRef: TemplateRef<any>) {
    }
}
