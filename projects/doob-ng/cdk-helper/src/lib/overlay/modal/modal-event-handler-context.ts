
import { IOverlayHandle } from '../overlay.service';
export class ModalEventHandlerContext<T = any> {
    payload: T;
    handle: IOverlayHandle;
}
