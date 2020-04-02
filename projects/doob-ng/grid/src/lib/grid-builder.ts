import { GridOptions, GridReadyEvent, GridApi, MenuItemDef, RowClickedEvent, CellContextMenuEvent } from '@ag-grid-community/all-modules';
import { AgGridColumn } from '@ag-grid-community/angular/lib/ag-grid-column.component';
import { GridColumn } from './grid-column';
import { GridColumnBuilder } from './grid-column-builder';
import { AgGridAngular } from '@ag-grid-community/angular';

export class GridBuilder<T = any> {

    private _options: GridOptions;
    private grid: AgGridAngular;
    private tempApi: ((api: GridApi) => void);

    private BuilderOptions = new GridBuilderOptions();

    constructor(options?: GridOptions) {
        this._options = options || this.NewDefaultOptions();
    }

    private NewDefaultOptions(): GridOptions {

        return {
            onGridReady: (event: GridReadyEvent) => {
                event.api.sizeColumnsToFit();
                if(this.tempApi) {
                    this.tempApi(event.api);
                    this.tempApi = null;
                }
            }
        }
    }

    SetColumns(...columns: (AgGridColumn | GridColumn<T> | ((builder: GridColumnBuilder<T>) => GridColumn))[]) {

        const agColumns = columns.map(c => {
            if (c instanceof Function) {
                return c(new GridColumnBuilder<T>());
            }
            return c;
        }).map(c => {
            if (c instanceof GridColumn) {
                return <AgGridColumn>(<any>c).agGridColumn
            } else {
                return c;
            }
        })

        this.SetGridOptions({
            columnDefs: [...agColumns]
        })
        return this;
    }

    SetData(data: T[]) {
        if(this.grid && this.grid.api) {
            this.grid.api.setRowData(data);
        } else {
            this.SetGridOptions({
                rowData: data
            })
        }
        return this;
    }

    SetGridOptions(options: GridOptions) {
        this._options = {
            ...this._options,
            ...options || {}
        }
        return this;
    }

    Build() {
        return this._options;
    }

    SetGridApi(value: (api: GridApi) => void) {
        if(this.grid && this.grid.api){
            value(this.grid.api)
        } else {
            this.tempApi = value;
        }
        return this;
    }

    OnCellContextMenu(value: ((event: CellContextMenuEvent) => void)) {

        const event = (event: CellContextMenuEvent) => {
            const mEvent = event.event as MouseEvent;
            if(mEvent.ctrlKey) {
                return;
            }
            value(event);
        }
        this.SetGridOptions({
            onCellContextMenu: event
        })
        return this;
    }

    OnViewPortContextMenu(value: (($event: MouseEvent, gridApi: GridApi) => void)) {
        this.BuilderOptions.OnViewPortContextMenu = value;
        return this;
    }

    _internalSetGrid(grid: AgGridAngular) {
        this.grid = grid;
    }


}

export class GridBuilderOptions {

    OnViewPortContextMenu: (($event: MouseEvent, gridApi: GridApi) => void);
}
