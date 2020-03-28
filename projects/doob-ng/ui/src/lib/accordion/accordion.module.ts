import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DoobAccordionComponent } from './accordion.component';



@NgModule({
  declarations: [DoobAccordionComponent],
  imports: [
      CommonModule
  ],
  exports: [DoobAccordionComponent]
})
export class DoobAccordionModule { }
