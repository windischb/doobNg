import { NgModule } from '@angular/core';
import { DoobDropdownComponent } from './dropdown.component';
import { CommonModule } from '@angular/common';
import { DoobSharedModule } from '../shared/shared.module';



@NgModule({
    declarations: [
        DoobDropdownComponent
    ],
    imports: [
        CommonModule,
        DoobSharedModule
    ],
    exports: [
        DoobDropdownComponent,
        DoobSharedModule
    ]
})
export class DoobDropdownModule { }
