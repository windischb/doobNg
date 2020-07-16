import { Directive, OnInit, Input, TemplateRef, OnDestroy, Output, EventEmitter, AfterContentInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { DoobPortalService } from './portal.service';
import { PortalTemplateRef } from './portal-template-ref';

@Directive({
    selector: '[dbPortalTemplate]'
})
export class DoobPortalTemplateDirective implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {

    @Input() dbPortalTemplate: string;
    @Input() hook: "OnInit" | "AfterContentInit" | "AfterViewInit" = "OnInit";
    @Output() hasTarget: EventEmitter<boolean> = new EventEmitter<boolean>();

    private portalTemplateRef: PortalTemplateRef;

    constructor(private portal: DoobPortalService, private templateRef: TemplateRef<any>, private cref: ChangeDetectorRef) {

    }

    ngOnInit() {

        if (this.hook.toLowerCase() == "oninit") {
            setTimeout(() => {
                this.AttachTemplate();
                this.cref.detectChanges();
            }, 0);
            
        }

    }

    ngAfterContentInit() {
        if (this.hook.toLowerCase() === "aftercontentinit") {
            // setTimeout(() => {
                this.AttachTemplate();
            // }, 0);
        }
    }

    ngAfterViewInit() {
        if (this.hook.toLowerCase() === "afterviewinit") {
            // setTimeout(() => {
                this.AttachTemplate();
            // }, 0);
        }
    }

    private AttachTemplate() {
        if (this.dbPortalTemplate) {
            this.portalTemplateRef = new PortalTemplateRef(this.templateRef);
            this.portalTemplateRef.OnSet = () => {
                this.hasTarget.next(true);
            }
            this.portal.AttachTemplate(this.dbPortalTemplate, this.portalTemplateRef)
        }
    }

    ngOnDestroy() {
        if (this.dbPortalTemplate) {
            this.portal.ClearPortal(this.dbPortalTemplate)
        }
    }

}
