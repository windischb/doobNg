import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import { OverlayRef } from '@angular/cdk/overlay';
import { OverlayContext } from '@local/cdk-helper';
import { AppUIService } from '../../app-ui.service';

@Component({
    templateUrl: './component-modal.component.html'
})
export class ComponentModalComponent {


    constructor(public ui: AppUIService, public context: OverlayContext<any>) {

    }

    ok() {
        this.context.invoke("Log", "Payload sent...")
    }

    cancel() {
        this.context.overlayRef.dispose();
    }
}
