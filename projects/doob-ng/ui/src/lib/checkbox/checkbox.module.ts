import { NgModule } from '@angular/core';
import { DoobCheckboxComponent } from './checkbox.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [DoobCheckboxComponent],
  imports: [
      CommonModule
  ],
  exports: [DoobCheckboxComponent]
})
export class DoobCheckboxModule { }
