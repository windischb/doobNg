import { GridOptions, GridReadyEvent, GridApi, MenuItemDef, RowClickedEvent, CellContextMenuEvent, RowDoubleClickedEvent, CellDoubleClickedEvent, CellClickedEvent, ModelUpdatedEvent, GridSizeChangedEvent } from '@ag-grid-community/all-modules';
import { AgGridColumn } from '@ag-grid-community/angular';
import { GridColumn } from './grid-column';
import { GridColumnBuilder } from './grid-column-builder';
import { AgGridAngular } from '@ag-grid-community/angular';
import { Observable, isObservable } from 'rxjs';

export class GridBuilder<T = any> {

    private _options: GridOptions;
    private grid: AgGridAngular;
    private tempApi: ((api: GridApi) => void);

    private BuilderOptions = new GridBuilderOptions();

    private DataObservable$: Observable<T[]>;
    constructor(options?: GridOptions) {
        this._options = options || this.NewDefaultOptions();
    }

    private NewDefaultOptions(): GridOptions {

        return {
            onGridReady: (event: GridReadyEvent) => {
                event.api.sizeColumnsToFit();
                if (this.tempApi) {
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

    SetData(data: T[] | Observable<T[]>) {

        if (isObservable(data)) {
            this.DataObservable$ = data;
        } else {
            if (this.grid && this.grid.api) {
                this.grid.api.setRowData(data);
            } else {
                this.SetGridOptions({
                    rowData: data
                })
            }
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
        if (this.grid && this.grid.api) {
            value(this.grid.api)
        } else {
            this.tempApi = value;
        }
        return this;
    }

    GetGridApi() {
        if (this.grid && this.grid.api) {
            return this.grid.api
        }
        return null;
    }

    GetData() {
        if (this.grid && this.grid.api) {

            let items: Array<T> = [];
            this.grid.api.forEachNode(function (node) {
                items.push(node.data);
            });
            return items;

        }
        return null;
    }

    GetSelectedData() {
        if (this.grid && this.grid.api) {
            return this.grid.api.getSelectedNodes().map(n => <T>n.data)

        }
        return [];
    }

    OnCellContextMenu(value: ((event: CellContextMenuEvent) => void)) {

        const event = (event: CellContextMenuEvent) => {
            const mEvent = event.event as MouseEvent;
            if (mEvent.ctrlKey) {
                return;
            }
            value(event);
        }
        this.SetGridOptions({
            onCellContextMenu: event
        })
        return this;
    }

    OnRowDoubleClicked(value: ((event: RowDoubleClickedEvent) => void)) {

        this.SetGridOptions({
            onRowDoubleClicked: value
        })
        return this;
    }

    OnCellDoubleClicked(value: ((event: CellDoubleClickedEvent) => void)) {

        this.SetGridOptions({
            onCellDoubleClicked: value
        })
        return this;
    }

    OnRowClicked(value: ((event: RowClickedEvent) => void)) {

        this.SetGridOptions({
            onRowClicked: value
        })
        return this;
    }

    OnCellClicked(value: ((event: CellClickedEvent) => void)) {

        this.SetGridOptions({
            onCellClicked: value
        })
        return this;
    }

    OnViewPortContextMenu(value: (($event: MouseEvent, gridApi: GridApi) => void)) {
        this.BuilderOptions.OnViewPortContextMenu = value;
        return this;
    }

    OnViewPortClick(value: (($event: MouseEvent, gridApi: GridApi) => void)) {
        this.BuilderOptions.OnViewPortClick = value;
        return this;
    }

    OnDataUpdate(value: ((data: Array<T>, event: ModelUpdatedEvent) => void)) {

        this.SetGridOptions({
            onModelUpdated: (event: ModelUpdatedEvent) => {

                let items: Array<T> = [];
                event.api.forEachNode(function (node) {
                    items.push(node.data);
                });

                value(items, event);
            }
        })
        return this;
    }

    WithRowSelection(value: "single" | "multiple") {
        this.SetGridOptions({
            rowSelection: value,
            rowDeselection: value == "multiple"
        })
        return this;
    }

    WithFullRowEditType(value?: boolean) {
        if (value === null || value === undefined) {
            value = true;
        }
        this.SetGridOptions({
            editType: value ? "fullRow" : null,
        })
        return this;
    }

    WithShiftResizeMode(value?: boolean) {
        if (value === null || value === undefined) {
            value = true;
        }
        this.SetGridOptions({
            colResizeDefault: value ? "shift" : null,
        })
        return this;
    }
    StopEditingWhenGridLosesFocus(value?: boolean) {
        if (value === null || value === undefined) {
            value = true;
        }
        this.SetGridOptions({
            stopEditingWhenGridLosesFocus: value
        })
        return this;
    }

    OnGridSizeChange(value: ((event: GridSizeChangedEvent) => void)) {
        this.SetGridOptions({
            onGridSizeChanged: value
        })
        return this;
    }

    SetDataImmutable(getNodeId?: (data: T) => any) {
        this.SetGridOptions({
            immutableData: true
        })
        if (getNodeId) {
            this.SetGridOptions({
                getRowNodeId: getNodeId
            })
        }
        return this;
    }

    SetRowId(getNodeId?: (data: T) => any) {
        if (getNodeId) {
            this.SetGridOptions({
                getRowNodeId: getNodeId
            })
        }
        return this;
    }

    SetRowClassRules(rules: {}) {
        this.SetGridOptions({
            rowClassRules: rules
        });
        return this;
    }

    _internalSetGrid(grid: AgGridAngular) {
        this.grid = grid;
    }


}

export class GridBuilderOptions {

    OnViewPortContextMenu: (($event: MouseEvent, gridApi: GridApi) => void);
    OnViewPortClick: (($event: MouseEvent, gridApi: GridApi) => void);
}
