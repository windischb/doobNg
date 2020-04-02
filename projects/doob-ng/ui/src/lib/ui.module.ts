import { NgModule } from '@angular/core';
import { DoobTabsModule } from './tabs';
import { DoobCheckboxModule } from './checkbox';
import { DoobDropdownModule } from './dropdown';
import { DoobAccordionModule } from './accordion/accordion.module';
import { DoobMenuModule } from './menu/menu.module';
import { CommonModule } from '@angular/common';


const exportModules = [
    DoobCheckboxModule,
    DoobTabsModule,
    DoobDropdownModule,
    DoobAccordionModule,
    DoobMenuModule
]

@NgModule({
  imports: [
      CommonModule,
    ...exportModules
  ],
  declarations: [
  ],
  exports: [
    ...exportModules
  ]
})
export class DoobUIModule { }
