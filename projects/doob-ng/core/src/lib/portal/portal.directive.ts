import { Directive, OnInit, Input, ViewContainerRef, Output, EventEmitter, OnDestroy } from "@angular/core";
import { DoobPortalService } from './portal.service';
import { PortalRef } from './portal-ref';

@Directive({
    selector: '[dbPortal]',
    exportAs: 'dbPortal'
})
export class DoobPortalDirective implements OnInit, OnDestroy {

    @Input() dbPortal: string;

    @Output() hasSource: EventEmitter<boolean> = new EventEmitter<boolean>();

    private portalRef: PortalRef;

    constructor(private portal: DoobPortalService, private viewContainerRef: ViewContainerRef) {

    }

    ngOnInit() {
        if (this.dbPortal) {
            this.portalRef = new PortalRef(this.viewContainerRef);
            this.portalRef.OnSet = () => {
                this.hasSource.next(true);
            }
            this.portal.AddPortal(this.dbPortal, this.portalRef)
        }
    }

    ngOnDestroy() {
        if (this.dbPortal) {
            this.portal.RemovePortal(this.dbPortal)
        }
    }

}
