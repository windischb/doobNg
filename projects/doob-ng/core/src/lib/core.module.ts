import { NgModule } from '@angular/core';
import { DoobOnInitDirective } from './directives/on-init.directive';
import { DoobAfterViewInitDirective } from './directives/after-view-init.directive';
import { DoobOnDestroyDirective } from './directives/on-destroy.directive';
import { DoobSetFocusDirective } from './directives/set-focus.directive';
import { DoobStopPropagationDirective } from './directives/stop-propagation.directive';


const exportDirectives = [
  DoobOnInitDirective,
  DoobAfterViewInitDirective,
  DoobOnDestroyDirective,
  DoobSetFocusDirective,
  DoobStopPropagationDirective
]


@NgModule({
  imports: [],
  declarations: [
    ...exportDirectives
  ],
  exports: [
    ...exportDirectives
  ]
})
export class DoobCoreModule { }
