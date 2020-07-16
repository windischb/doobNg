import { Directive, OnInit, Input, ViewContainerRef, Output, EventEmitter, OnDestroy, AfterContentInit, AfterViewInit } from "@angular/core";
import { DoobPortalService } from './portal.service';
import { PortalRef } from './portal-ref';

@Directive({
    selector: '[dbPortal]',
    exportAs: 'dbPortal'
})
export class DoobPortalDirective implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {

    @Input() dbPortal: string;
    @Input() hook: "OnInit" | "AfterContentInit" | "AfterViewInit" = "OnInit";
    @Output() hasSource: EventEmitter<boolean> = new EventEmitter<boolean>();

    private portalRef: PortalRef;

    constructor(private portal: DoobPortalService, private viewContainerRef: ViewContainerRef) {

    }

    ngOnInit() {

        if (this.hook.toLowerCase() == "oninit") {
            // setTimeout(() => {
                this.SetPortal();
            // }, 0);
        }

    }

    ngAfterContentInit() {
        if (this.hook.toLowerCase() === "aftercontentinit") {
            setTimeout(() => {
                this.SetPortal();
            }, 0);
        }
    }

    ngAfterViewInit() {
        if (this.hook.toLowerCase() === "afterviewinit") {
            setTimeout(() => {
                this.SetPortal();
            }, 0);
        }
    }

    private SetPortal() {
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
