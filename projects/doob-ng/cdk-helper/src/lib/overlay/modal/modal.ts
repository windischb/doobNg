import { DoobOverlayService, IOverlayHandle } from '../overlay.service';
import { ModalEventHandlerContext } from './modal-event-handler-context';
import { ModalOptions } from './modal-options';

export class Modal {


    private modalSubscription: IOverlayHandle;

    constructor(private overlayService: DoobOverlayService, private options: ModalOptions) {

    }

    SetData(value: any) {
        this.options.overlayContextBase.data = value;
        return this;
    }

    AddEventHandler(key: string, handler: ((context: ModalEventHandlerContext) => void)) {
        this.options.overlayContextBase.eventHandlers[key] = handler;
        return this;
    }

    CloseOnOutsideClick(value?: boolean) {

        if(value === null || value === undefined) {
            value = true;
        }

        this.options.overlayContextBase.closeOnOutsideClick = value;
        return this;
    }


    Open() {

        if(this.options.component) {

            this.modalSubscription = this.overlayService.OpenComponentModal(this.options.component, this.options.overlayContextBase);
        } else {
            this.modalSubscription = this.overlayService.OpenTemplateRefModal(this.options.templateRef, this.options.viewContainerRef, this.options.overlayContextBase);
        }
        return this;
    }

    Close() {
        this.modalSubscription?.Close();
        return this;
    }
}


