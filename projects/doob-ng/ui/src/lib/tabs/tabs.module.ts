import { NgModule } from '@angular/core';
import { DoobTabsComponent } from './tabs.component';
import { DoobTabComponent } from './tab.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DoobTabsComponent,
    DoobTabComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DoobTabsComponent,
    DoobTabComponent
  ]
})
export class DoobTabsModule { }
