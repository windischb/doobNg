import { Directive, Input, HostListener } from '@angular/core';
import { AgGridAngular } from "@ag-grid-community/angular";
import { GridBuilder, GridBuilderOptions } from './grid-builder';
import { GridOptions } from '@ag-grid-community/all-modules';

@Directive({
    selector: 'ag-grid-angular[dbGrid]',
    exportAs: 'dbGrid',
    host: {
        style: `
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        `
    }
})
export class DoobGridDirective {

    builderOptions: GridBuilderOptions;

    @Input()
    set dbGrid(value: GridOptions | GridBuilder) {
        if (value instanceof GridBuilder) {
            this.aggrid.gridOptions = value.Build();
            value._internalSetGrid(this.aggrid);
            this.builderOptions = (<any>value).BuilderOptions
        } else {
            this.aggrid.gridOptions = value;
        }

    }

    @HostListener('contextmenu', ['$event'])
    OnContextMenu($event: MouseEvent) {

        if ($event.ctrlKey) {
            return;
        }

        $event.stopPropagation();
        $event.preventDefault();

        const targetElement = $event.target as HTMLElement;
        const targetIsViewPort = targetElement.classList.contains("ag-center-cols-viewport");

        if(this.builderOptions?.OnViewPortContextMenu && targetIsViewPort) {
            this.builderOptions.OnViewPortContextMenu($event, this.aggrid.api);
        }

    }

    constructor(private aggrid: AgGridAngular) {

    }

}
