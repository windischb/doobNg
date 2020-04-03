import { DoobOverlayService, IOverlayHandle } from '../overlay.service';
import { ModalEventHandlerContext } from './modal-event-handler-context';
import { Type } from '@angular/core';
import { ComponentModalOptions } from '../component-modal-options';
import { OverlayOptions } from '../overlay-options';

export class ComponentModal<T> {


    private modalSubscription: IOverlayHandle;
    private componentModalOptions: ComponentModalOptions = new ComponentModalOptions();
    private overlayOptions: OverlayOptions = new OverlayOptions()

    constructor(private overlayService: DoobOverlayService, private component: Type<T>) {

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

    SetModalOptions(options: ComponentModalOptions) {
        this.componentModalOptions = options;
        return this;
    }

    Open() {

        this.modalSubscription = this.overlayService.OpenComponentModal(this.component, this.overlayOptions, this.componentModalOptions);
        return this;
    }

    Close() {
        this.modalSubscription?.Close();
        return this;
    }
}


