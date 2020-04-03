import { ComponentFactoryResolver } from "@angular/core";
import { OverlayConfig } from '@angular/cdk/overlay';

export class ComponentModalOptions {
    componentFactoryResolver?: ComponentFactoryResolver;
    overlayConfig?: OverlayConfig;
}
