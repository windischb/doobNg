import { Injectable, TemplateRef, ViewContainerRef, ApplicationRef, Type, Injector, ComponentRef, ComponentFactoryResolver } from "@angular/core";
import { OverlayRef, Overlay, FlexibleConnectedPositionStrategyOrigin } from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { fromEvent, Subscription, race, merge } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { OverlayOptions } from './overlay-options';
import { ModalEventHandlerContext } from "./modal/modal-event-handler-context";
import { ModalEventHandlers } from "./modal/modal-event-handlers";

@Injectable({
    providedIn: 'root'
})
export class DoobOverlayService {

    constructor(private overlay: Overlay, private injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) {

    }

    OpenContextMenu($event: MouseEvent, templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, context: any): IOverlayHandle {


        if ($event.ctrlKey) {
            return;
        }

        $event.preventDefault();


        const positionStrategy = this.overlay.position()
            .flexibleConnectedTo({ x: $event.x, y: $event.y })
            .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                }
            ]);

        const overlayRef = this.overlay.create({
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.close(),
        });
        var tp = new TemplatePortal(templateRef, viewContainerRef, {
            $implicit: context
        });

        var emb = overlayRef.attach(tp);

        return new ContextMenuHandle(overlayRef, emb.rootNodes, $event);
    }

    OpenTemplateRefModal(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, context: any): IOverlayHandle {

        const positionStrategy = this.overlay.position()
            .global()
            .top("50px")
            .centerHorizontally()

        const overlayRef = this.overlay.create({
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.close(),
            hasBackdrop: true,
        });

        var options = this.buildOverlayOptions(context);

        const modalContext = new OverlayContext(overlayRef, options);

        var tp = new TemplatePortal(templateRef, viewContainerRef, {
            $implicit: modalContext
        });

        overlayRef.attach(tp);

        return new ModalHandle(overlayRef, options);
    }

    OpenComponentModal<T>(component: Type<T>, context: any): IOverlayHandle {

        const positionStrategy = this.overlay.position()
            .global()
            .top("50px")
            .centerHorizontally()

        const overlayRef = this.overlay.create({
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.close(),
            hasBackdrop: true,
        });
        var options = this.buildOverlayOptions(context);
        var cp = new ComponentPortal(component, null, this.createPortalInjector(overlayRef, options), this.componentFactoryResolver);

        const containerRef: ComponentRef<T> = overlayRef.attach(cp);

        return new ModalHandle(overlayRef, options);
    }

    private createPortalInjector<T>(overlayRef: OverlayRef, options: OverlayOptions<T>): PortalInjector {
        const injectionTokens = new WeakMap();


        const modalContext = new OverlayContext<T>(overlayRef, options);


        injectionTokens.set(OverlayContext, modalContext);

        return new PortalInjector(this.injector, injectionTokens);
    }

    private buildOverlayOptions<T>(context: T) {

        let baseContext: OverlayOptions<T>;

        if (!(context instanceof OverlayOptions)) {
            baseContext = new OverlayOptions<T>();
            baseContext.data = context
        } else {
            baseContext = context;
        }

        return baseContext;
    }

}

export interface IOverlayHandle {
    Close();
}
export class ContextMenuHandle implements IOverlayHandle {

    private sub: Subscription

    constructor(private overlayRef: OverlayRef, templ: Array<HTMLElement>, excludeEvent: MouseEvent) {


        this.sub = merge(fromEvent<MouseEvent>(document, 'click'), fromEvent<MouseEvent>(document, 'contextmenu'))
            .pipe(
                filter(ev => ev.type !== 'contextmenu' || (ev.x != excludeEvent.x && ev.y != excludeEvent.y)),
                filter(event => {
                    const clickTarget = event.target as HTMLElement;
                    return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
                }),
                take(1)
            ).subscribe(() => {
                this.Close();
            })
    }

    Close() {
        this.sub && this.sub.unsubscribe();
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
}

export class ModalHandle implements IOverlayHandle {

    constructor(private overlayRef: OverlayRef, options: OverlayOptions) {

        if (options.closeOnOutsideClick) {
            overlayRef.backdropClick()
                .pipe(
                    take(1)
                )
                .subscribe(() => this.Close())
        }
    }

    Close() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
}

export class OverlayContext<T = any> {


    data: T;
    eventHandlers: ModalEventHandlers;

    constructor(public overlayRef: OverlayRef, context: OverlayOptions<T>) {

        this.data = context.data;
        this.eventHandlers = context.eventHandlers;

    }

    invoke(key: string, payload: any) {
        if (this.eventHandlers[key]) {

            let eventContext = new ModalEventHandlerContext();
            eventContext.overlayRef = this.overlayRef;
            eventContext.payload = payload;
            this.eventHandlers[key](eventContext);
        }
    }

}

