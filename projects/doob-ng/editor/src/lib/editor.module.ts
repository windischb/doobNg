import { NgModule } from '@angular/core';
import { DoobEditorComponent } from './editor.component';
import { CommonModule } from '@angular/common';
import { DoobEditorStateService } from './services/editor-state.service';

@NgModule({
  declarations: [
    DoobEditorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DoobEditorComponent
  ],
  providers: [
    DoobEditorStateService
  ]
})
export class DoobEditorModule { }
