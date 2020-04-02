import { OverlayRef } from '@angular/cdk/overlay';
export class ModalEventHandlerContext<T = any> {
    payload: T;
    overlayRef: OverlayRef;
}
