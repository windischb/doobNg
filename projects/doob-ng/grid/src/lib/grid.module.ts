import { NgModule } from '@angular/core';
import { DoobGridDirective } from './grid.directive';
import { AgGridModule } from "@ag-grid-community/angular";
import { ModuleRegistry, ClientSideRowModelModule } from '@ag-grid-community/all-modules';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        DoobGridDirective
    ],
    imports: [
        CommonModule,
        AgGridModule.withComponents([])
    ],
    exports: [
        DoobGridDirective,
        AgGridModule
    ]
})
export class DoobGridModule {
    constructor() {
        ModuleRegistry.registerModules([
            ClientSideRowModelModule
        ]);
    }
}
