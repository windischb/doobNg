import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, ViewContainerRef } from "@angular/core";
import { DoobModalService } from '@local/cdk-helper';
import { ComponentModalComponent } from './component-modal.component';

@Component({
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelDemoComponent {


    @ViewChild('simpleModal') simpleModal: TemplateRef<any>;

    constructor(private modal: DoobModalService, private viewContainerRef: ViewContainerRef) {

    }


    openTemplateModal() {
        this.modal
            .FromTemplate(this.simpleModal, this.viewContainerRef)
            .CloseOnOutsideClick()
            .Open();
        //this.overlay.OpenTemplateRefModal(this.simpleModal, this.viewContainerRef, {});
    }

    openComponentModal() {
        let m = this.modal.FromComponent(ComponentModalComponent)
            .SetData({
                header: "Component Modal",
                name: "Bernhard"
            })
            .AddEventHandler("Log", (ct) => alert(`${ct.payload}`))
            .CloseOnOutsideClick()
            .Open();

    }
}
