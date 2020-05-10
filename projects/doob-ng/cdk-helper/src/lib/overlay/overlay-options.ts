import { ModalEventHandlers } from './modal/modal-event-handlers';

export class OverlayOptions<TData = any, TMeta = any> {
    data: TData;
    metaData: TMeta;
    eventHandlers: ModalEventHandlers = new ModalEventHandlers();
    closeOnOutsideClick: boolean;
    closeOnEsc: boolean;
    onClose: (() => void);
}


