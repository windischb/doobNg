import { NgModule } from '@angular/core';
import { DoobGridDirective } from './grid.directive';
import { AgGridModule } from "@ag-grid-community/angular";
import { ModuleRegistry, ClientSideRowModelModule } from '@ag-grid-community/all-modules';
import { CommonModule } from '@angular/common';
import { DoobDateCellRendererComponent } from './cell-renderer/date-cell-renderer.component';
import { DoobLabelCellRendererComponent } from './cell-renderer/label-cell-renderer.component';


const GridCellRendererComponents = [
    DoobDateCellRendererComponent,
    DoobLabelCellRendererComponent
]

@NgModule({
    declarations: [
        DoobGridDirective,
        ...GridCellRendererComponents
    ],
    imports: [
        CommonModule,
        AgGridModule.withComponents([
            ...GridCellRendererComponents
        ])
    ],
    exports: [
        DoobGridDirective,
        AgGridModule,
        ...GridCellRendererComponents
    ]
})
export class DoobGridModule {
    constructor() {
        ModuleRegistry.registerModules([
            ClientSideRowModelModule
        ]);
    }
}
