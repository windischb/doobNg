import { Injectable, TemplateRef, ViewContainerRef, Type, Injector, ComponentRef, ComponentFactoryResolver } from "@angular/core";
import { OverlayRef, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { fromEvent, Subscription, merge, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { OverlayOptions } from './overlay-options';
import { ModalEventHandlerContext } from "./modal/modal-event-handler-context";
import { ModalEventHandlers } from "./modal/modal-event-handlers";
import { ComponentModalOptions } from './component-modal-options';
import { TemplateModalOptions } from './template-modal-options';

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

    OpenTemplateRefModal(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, context: any, templateModalOptions?: TemplateModalOptions): IOverlayHandle {
        console.log(context)
        const positionStrategy = this.overlay.position()
            .global()
            .top("50px")
            .centerHorizontally()

        let overlayConfig: OverlayConfig = {
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.close(),
            hasBackdrop: true,
            ...templateModalOptions?.overlayConfig
        }

        const overlayRef = this.overlay.create(overlayConfig);

        var options = this.buildOverlayOptions(context);
        const handle = new ModalHandle(overlayRef, options);
        const modalContext = new OverlayContext(handle, options);

        var tp = new TemplatePortal(templateRef, viewContainerRef, {
            $implicit: modalContext
        });

        overlayRef.attach(tp);

        return handle;
    }

    OpenComponentModal<T>(component: Type<T>, context: any, componentModalOptions?: ComponentModalOptions): IOverlayHandle {

        const positionStrategy = this.overlay.position()
            .global()
            .top("50px")
            .centerHorizontally()

        let overlayConfig: OverlayConfig = {
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.close(),
            hasBackdrop: true,
            ...componentModalOptions?.overlayConfig
        }

        const overlayRef = this.overlay.create(overlayConfig);

        var options = this.buildOverlayOptions(context);
        const handle = new ModalHandle(overlayRef, options);

        var cp = new ComponentPortal(component, null, this.createPortalInjector(options, handle), componentModalOptions?.componentFactoryResolver || this.componentFactoryResolver);

        overlayRef.attach(cp);

        return handle
    }

    private createPortalInjector<T>(options: OverlayOptions<T>, handle: IOverlayHandle): PortalInjector {
        const injectionTokens = new WeakMap();


        const modalContext = new OverlayContext<T>(handle, options);


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

    private closeDestroy$ = new Subject();
    constructor(private overlayRef: OverlayRef, templ: Array<HTMLElement>, excludeEvent: MouseEvent) {
        merge(fromEvent<MouseEvent>(document, 'click'), fromEvent<MouseEvent>(document, 'contextmenu'))
            .pipe(
                takeUntil(this.closeDestroy$),
                filter(ev => ev.type !== 'contextmenu' || (ev.x != excludeEvent.x && ev.y != excludeEvent.y)),
                filter(event => {
                    const clickTarget = event.target as HTMLElement;
                    return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
                }),
            ).subscribe(() => {
                this.Close();
            })
    }

    Close() {
        this.closeDestroy$.next();
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
}

export class ModalHandle implements IOverlayHandle {

    private closeDestroy$ = new Subject();
    constructor(private overlayRef: OverlayRef, private options: OverlayOptions) {

        if (options.closeOnOutsideClick) {
            overlayRef.backdropClick()
                .pipe(
                    takeUntil(this.closeDestroy$)
                )
                .subscribe(() => this.Close())
        }
        if (options.closeOnEsc) {
            overlayRef.keydownEvents()
                .pipe(
                    takeUntil(this.closeDestroy$),
                    filter(ev => ev.keyCode === 27 )
                )
                .subscribe(() => this.Close())
        }
    }

    Close() {
        this.closeDestroy$.next();
        if(this.options.onClose) {
            this.options.onClose();
        }
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
}

export class OverlayContext<TData = any, TMeta = any> {


    data: TData;
    eventHandlers: ModalEventHandlers;
    metaData:  TMeta;

    constructor(public handle: IOverlayHandle, context: OverlayOptions<TData, TMeta>) {

        this.data = context.data;
        this.metaData = context.metaData;
        this.eventHandlers = context.eventHandlers;

    }

    invoke<TResult>(key: string, payload: any): TResult {
        if (this.eventHandlers[key]) {

            let eventContext = new ModalEventHandlerContext();
            eventContext.handle = this.handle;
            eventContext.payload = payload;
            return this.eventHandlers[key](eventContext);
        }
    }

}


