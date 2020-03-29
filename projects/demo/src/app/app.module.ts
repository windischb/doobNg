import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RouteComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';

import { DoobUIModule } from "@local/ui";
import { DoobPrismModule } from '@local/prism';
import { DemoPartComponent } from './shared/components/part/part.component';
import { DoobEditorModule } from '@local/editor';
import { DoobCdkHelperModule } from '@local/cdk-helper';

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    ...RouteComponents,
    DemoPartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DoobUIModule,
    DoobPrismModule,
    DoobEditorModule,
    DoobCdkHelperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
