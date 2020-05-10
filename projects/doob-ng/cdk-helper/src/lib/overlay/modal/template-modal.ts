import { DoobOverlayService, IOverlayHandle } from '../overlay.service';
import { ModalEventHandlerContext } from './modal-event-handler-context';
import { TemplateRef, ViewContainerRef } from '@angular/core';

import { OverlayOptions } from '../overlay-options';
import { TemplateModalOptions } from '../template-modal-options';

export class TemplateModal {


    private modalSubscription: IOverlayHandle;
    private templateModalOptions: TemplateModalOptions = new TemplateModalOptions();
    private overlayOptions: OverlayOptions = new OverlayOptions()

    constructor(private overlayService: DoobOverlayService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {

    }

    SetData(value: any) {
        this.overlayOptions.data = value;
        return this;
    }

    AddEventHandler(key: string, handler: ((context: ModalEventHandlerContext) => void)) {
        this.overlayOptions.eventHandlers[key] = handler;
        return this;
    }

    CloseOnOutsideClick(value?: boolean) {

        if(value === null || value === undefined) {
            value = true;
        }

        this.overlayOptions.closeOnOutsideClick = value;
        return this;
    }

    CloseOnEscape(value?: boolean) {
        if (value === null || value === undefined) {
            value = true;
        }

        this.overlayOptions.closeOnEsc = value;
        return this;
    }

    SetModalOptions(options: TemplateModalOptions) {
        this.templateModalOptions = options;
        return this;
    }

    OnClose(action: () => void) {
        this.overlayOptions.onClose = action;
        return this;
    }

    Open() {
        this.modalSubscription = this.overlayService.OpenTemplateRefModal(this.templateRef, this.viewContainerRef, this.overlayOptions, this.templateModalOptions);
        return this;
    }

    Close() {
        this.modalSubscription?.Close();
        return this;
    }
}


