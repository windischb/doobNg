import { Injectable, TemplateRef, ViewContainerRef, ApplicationRef } from "@angular/core";
import { OverlayRef, Overlay, FlexibleConnectedPositionStrategyOrigin } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent, Subscription, race, merge } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DoobOverlayService {

    constructor(private overlay: Overlay, private appRef: ApplicationRef) {

    }

    OpenContextMenu($event: MouseEvent, templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, context: any) {


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
            //hasBackdrop: true,
            //backdropClass: 'cdk-overlay-transparent-backdrop',
        });
        var tp = new TemplatePortal(templateRef, viewContainerRef, {
            $implicit: context
        });

        var emb = overlayRef.attach(tp);

        return new ContextMenuContext(overlayRef, emb.rootNodes, $event);
    }

}

export class ContextMenuContext {

    private sub: Subscription

    constructor(private overlayRef: OverlayRef, templ: Array<HTMLElement>, excludeEvent: MouseEvent) {


        this.sub =  merge(fromEvent<MouseEvent>(document, 'click'), fromEvent<MouseEvent>(document, 'contextmenu') )
            .pipe(
                filter(ev => ev.type !== 'contextmenu' || (ev.x != excludeEvent.x && ev.y != excludeEvent.y)),
                filter(event => {
                    const clickTarget = event.target as HTMLElement;
                    return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
                }),
                take(1)
            ).subscribe(() => {
                this.CloseContextMenu();
            })
    }

    CloseContextMenu() {
        this.sub && this.sub.unsubscribe();
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
}
