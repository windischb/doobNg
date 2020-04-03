import { Type, TemplateRef, ViewContainerRef, Injectable, ComponentFactoryResolver } from '@angular/core';
import { DoobOverlayService } from '../overlay.service';
import { ComponentModal } from './component-modal';
import { ModalOptions } from './modal-options';
import { TemplateModal } from './template-modal';

@Injectable({
    providedIn: 'root'
})
export class DoobModalService {

    constructor(private overlayService: DoobOverlayService) {

    }

    FromComponent<T>(component: Type<T>) {
        return new ComponentModal(this.overlayService, component);
    }

    FromTemplate(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
        return new TemplateModal(this.overlayService, templateRef, viewContainerRef);
    }



}




