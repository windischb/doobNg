import { NgModule } from '@angular/core';
import { DoobPrismComponent } from './prism.component';
import { CommonModule } from '@angular/common';
import { DoobEditorModule } from '@local/editor';



@NgModule({
  declarations: [DoobPrismComponent],
  imports: [
    CommonModule,
    DoobEditorModule
  ],
  exports: [DoobPrismComponent]
})
export class DoobPrismModule { }
