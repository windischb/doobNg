import { NgModule } from '@angular/core';
import { DoobCheckBoxGroup } from './directives/db-checkbox-group.directive';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { DoobIconComponent } from './components/db-icon/db-icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    DoobCheckBoxGroup,
    DoobIconComponent
  ],
  imports: [
    CommonModule,
    NzCheckboxModule,
    FontAwesomeModule,
    NzIconModule
  ],
  exports: [
    DoobCheckBoxGroup,
    FontAwesomeModule,
    DoobIconComponent,
    NzIconModule
  ]
})
export class DoobAntdExtensionsModule { }
