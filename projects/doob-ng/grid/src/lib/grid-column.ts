import { AgGridColumn } from '@ag-grid-community/angular';
import { Type } from '@angular/core';
import { ValueFormatterParams } from '@ag-grid-community/all-modules';
import { DoobValueFormatterParams } from './DoobValueFormatterParams';

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

    static Create(field: string) {
        return new GridColumn().SetField(field)
    }

    SetField(value: string): GridColumn {
        this.agGridColumn.field = value;
        this.agGridColumn.headerName = this.agGridColumn.headerName || this.Capitalized(value);
        return this;
    }

    SetHeader(value: string): GridColumn {
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

    Editable(value?: boolean): GridColumn {
        if(value === null || value === undefined) {
            value = true;
        }
        this.agGridColumn.editable = value;
        return this;
    }

    Sortable(value?: boolean): GridColumn {
        if(value === null || value === undefined) {
            value = true;
        }
        this.agGridColumn.sortable = value;
        return this;
    }

    SetInitialWidth(px: number, suppressSizeToFit?: boolean) {
        this.agGridColumn.width = px;
        if(suppressSizeToFit != undefined)
            this.SuppressSizeToFit(suppressSizeToFit)
        return this;
    }

    SetMinWidth(px: number) {
        this.agGridColumn.minWidth = px;
        return this;
    }

    SetMaxWidth(px: number) {
        this.agGridColumn.maxWidth = px;
        return this;
    }

    SetRenderer(value: string | Type<any>) {

        if (value === null || value === undefined) {
            return this;
        }

        if (typeof value === 'string') {
            this.agGridColumn.cellRenderer = value;
        }

        if (value instanceof Type) {
            this.agGridColumn.cellRendererFramework = value;
        }

        return this;
    }

    SetRendererParams(value: {}) {

        this.agGridColumn.cellRendererParams = {
            ...this.agGridColumn.cellRendererParams || {},
            ...value
        };
        return this;
    }

    SetValueFormatter<TValue = any, TData = any, TContext = any>(formatter: ((value: DoobValueFormatterParams<TValue,TData,TContext>) => any)) {
        this.agGridColumn.valueFormatter = formatter;
        return this;
    }

    Set(set: ((column: AgGridColumn) => void)) {
        set(this.agGridColumn);
        return this;
    }

    SuppressSizeToFit(value?: boolean): GridColumn {
        if(value === null || value === undefined) {
            value = true;
        }
        this.agGridColumn.suppressSizeToFit = value;
        return this;
    }


    private Capitalized(value: string) {
        if (typeof value === 'string') {
            return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
        }
        return value;
    }

}

