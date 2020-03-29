import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoobItemComponent, DoobDividerComponent, DoobHeaderComponent, DoobSubItemComponent } from './item';

const exportComponents = [
    DoobItemComponent,
    DoobDividerComponent,
    DoobHeaderComponent,
    DoobSubItemComponent
]

@NgModule({
  declarations: [
      ...exportComponents
    ],
  imports: [
      CommonModule
  ],
  exports: [
      ...exportComponents
  ]
})
export class DoobSharedModule { }
