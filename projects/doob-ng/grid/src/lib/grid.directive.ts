import { OnInit, Directive, Input, OnDestroy } from '@angular/core';
import { AgGridAngular } from "@ag-grid-community/angular";
import { GridBuilder } from './grid-builder';
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
export class DoobGridDirective implements OnInit, OnDestroy {

    @Input()
    set dbGrid(value: GridOptions | GridBuilder) {
        if (value instanceof GridBuilder) {
            this.aggrid.gridOptions = value.Build();
            value.InternalSetGrid(this.aggrid);
        } else {
            this.aggrid.gridOptions = value;
        }

    }
    constructor(private aggrid: AgGridAngular) {

    }


    ngOnInit(): void {

    }

    ngOnDestroy() {

    }


}
