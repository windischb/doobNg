import { Directive, OnInit, Input, TemplateRef, OnDestroy, Output, EventEmitter } from "@angular/core";
import { DoobPortalService } from './portal.service';
import { PortalTemplateRef } from './portal-template-ref';

@Directive({
    selector: '[dbPortalTemplate]'
})
export class DoobPortalTemplateDirective implements OnInit, OnDestroy {

    @Input() dbPortalTemplate: string;
    @Output() hasTarget: EventEmitter<boolean> = new EventEmitter<boolean>();

    private portalTemplateRef: PortalTemplateRef;

    constructor(private portal: DoobPortalService, private templateRef: TemplateRef<any>) {

    }

    ngOnInit() {
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
