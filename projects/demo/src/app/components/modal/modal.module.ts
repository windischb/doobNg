import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DoobCoreModule } from '@local/core';
import { DoobUIModule } from '@local/ui';
import { ComponentModalComponent } from './component-modal.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DoobCoreModule,
        DoobUIModule
    ],
    declarations: [
        ComponentModalComponent
    ],
    exports: [
        ReactiveFormsModule,
        ComponentModalComponent
    ],
    entryComponents: [
        ComponentModalComponent
    ]
})
export class ModalModule {

}
