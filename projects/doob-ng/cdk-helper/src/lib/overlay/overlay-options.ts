import { ModalEventHandlers } from './modal/modal-event-handlers';

export class OverlayOptions<T = any> {
    data: T;
    eventHandlers: ModalEventHandlers = new ModalEventHandlers();
    closeOnOutsideClick: boolean;
}


