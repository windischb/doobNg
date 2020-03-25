import { NgModule } from '@angular/core';
import { DoobDropdownComponent } from './dropdown.component';
import { DoobDropdownItemComponent } from './dropdown-item.component';
import { CommonModule } from '@angular/common';
import { DoobDropdownDividerComponent } from './dropdown-divider.component';



@NgModule({
    declarations: [
        DoobDropdownComponent,
        DoobDropdownItemComponent,
        DoobDropdownDividerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DoobDropdownComponent,
        DoobDropdownItemComponent,
        DoobDropdownDividerComponent
    ]
})
export class DoobDropdownModule { }
