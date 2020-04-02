import { Type, TemplateRef, ViewContainerRef } from '@angular/core';
import { OverlayOptions } from '../overlay-options';
export class ModalOptions {
    component: Type<any>;
    templateRef: TemplateRef<any>;
    viewContainerRef: ViewContainerRef;
    overlayContextBase: OverlayOptions = new OverlayOptions();
}
