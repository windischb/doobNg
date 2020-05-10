import { Injectable } from "@angular/core";
import { PortalRef } from './portal-ref';
import { PortalTemplateRef } from './portal-template-ref';

@Injectable({
    providedIn: 'root'
})
export class DoobPortalService {

    private portalTargets = new Map<string, PortalRef>();
    private portalSources = new Map<string, PortalTemplateRef>();


    AddPortal(name: string, portalRef: PortalRef) {
        this.portalTargets.set(name, portalRef);
        const source = this.getSource(name)
        if (source) {
            this.setPortal(portalRef, source)
            this.portalSources.delete(name);
        }
    }

    RemovePortal(name: string) {
        this.ClearPortal(name);
        this.portalTargets.delete(name);
    }

    ClearPortal(name: string) {
        this.getPortal(name)?.viewContainerRef.clear();
    }

    AttachTemplate(targetName: string, portalTemplateRef: PortalTemplateRef) {
        const portalRef = this.getPortal(targetName);
        if (portalRef) {
            this.setPortal(portalRef, portalTemplateRef)
        } else {
            this.portalSources.set(targetName, portalTemplateRef)
        }
    }

    private getPortal(name: string) {
        return this.portalTargets.has(name) ? this.portalTargets.get(name) : null;
    }

    private getSource(name: string) {
        return this.portalSources.has(name) ? this.portalSources.get(name) : null;
    }

    private setPortal(portalRef: PortalRef, portalTemplateRef: PortalTemplateRef) {
        portalRef.viewContainerRef.createEmbeddedView(portalTemplateRef.templateRef)
        if (portalRef.OnSet) {
            portalRef.OnSet();
        }
    }


}
