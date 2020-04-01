import { AgGridColumn } from '@ag-grid-community/angular';

export class GridColumn<T = any> {

    private agGridColumn: AgGridColumn;

    constructor(column?: GridColumn | AgGridColumn) {

        if(column){
            if(column instanceof GridColumn) {
                this.agGridColumn = column.agGridColumn;
            } else {
                this.agGridColumn = column;
            }
        } else {
            this.agGridColumn = new AgGridColumn();
        }

    }

    UseField(value: string): GridColumn {
        this.agGridColumn.field = value;
        this.agGridColumn.headerName = this.agGridColumn.headerName || value;
        return this;
    }

    UseHeader(value: string): GridColumn {
        this.agGridColumn.headerName = value;
        this.agGridColumn.field = this.agGridColumn.field || value;
        return this;
    }

    Resizeable(value?: boolean): GridColumn {
        if(value === null || value === undefined) {
            value = true;
        }
        this.agGridColumn.resizable = value;
        return this;
    }

    Sortable(value?: boolean): GridColumn {
        if(value === null || value === undefined) {
            value = true;
        }
        this.agGridColumn.sortable = value;
        return this;
    }

}
