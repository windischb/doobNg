import { NgModule } from '@angular/core';
import { DoobPrismComponent } from './prism.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [DoobPrismComponent],
  imports: [
    CommonModule
  ],
  exports: [DoobPrismComponent]
})
export class DoobPrismModule { }
