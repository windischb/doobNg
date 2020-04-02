import { Type, TemplateRef, ViewContainerRef, Injectable } from '@angular/core';
import { DoobOverlayService } from '../overlay.service';
import { Modal } from './modal';
import { ModalOptions } from './modal-options';

@Injectable({
    providedIn: 'root'
})
export class DoobModalService {

    constructor(private overlayService: DoobOverlayService) {

    }

    FromComponent<T>(component: Type<T>) {
        const mOptions = new ModalOptions()
        mOptions.component = component;
        return new Modal(this.overlayService, mOptions);
    }

    FromTemplate(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
        const mOptions = new ModalOptions();
        mOptions.templateRef = templateRef
        mOptions.viewContainerRef = viewContainerRef;
        return new Modal(this.overlayService, mOptions);
    }



}




