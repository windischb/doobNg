import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DoobMenuComponent } from './menu.component';
import { DoobSharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
      DoobMenuComponent
    ],
  imports: [
      CommonModule,
      DoobSharedModule
  ],
  exports: [
      DoobMenuComponent,
      DoobSharedModule
    ]
})
export class DoobMenuModule { }
