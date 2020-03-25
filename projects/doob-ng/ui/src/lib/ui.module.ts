import { NgModule } from '@angular/core';
import { DoobTabsModule } from './tabs';
import { DoobCheckboxModule } from './checkbox';
import { DoobDropdownModule } from './dropdown';




@NgModule({
  imports: [
    DoobCheckboxModule,
    DoobTabsModule,
    DoobDropdownModule
  ],
  declarations: [],
  exports: [
    DoobCheckboxModule,
    DoobTabsModule,
    DoobDropdownModule
  ]
})
export class DoobUIModule { }
