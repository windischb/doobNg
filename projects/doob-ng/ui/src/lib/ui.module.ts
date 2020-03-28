import { NgModule } from '@angular/core';
import { DoobTabsModule } from './tabs';
import { DoobCheckboxModule } from './checkbox';
import { DoobDropdownModule } from './dropdown';
import { DoobAccordionModule } from './accordion/accordion.module';




@NgModule({
  imports: [
    DoobCheckboxModule,
    DoobTabsModule,
    DoobDropdownModule,
    DoobAccordionModule
  ],
  declarations: [],
  exports: [
    DoobCheckboxModule,
    DoobTabsModule,
    DoobDropdownModule,
    DoobAccordionModule
  ]
})
export class DoobUIModule { }
