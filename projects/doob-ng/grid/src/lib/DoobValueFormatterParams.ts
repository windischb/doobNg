import { ValueFormatterParams, RowNode, ColDef, Column, GridApi, ColumnApi } from '@ag-grid-community/all-modules';

export class DoobValueFormatterParams<TValue = any, TData = any, TContext = any> implements ValueFormatterParams {
    value: TValue;
    node: RowNode;
    data: TData;
    colDef: ColDef;
    column: Column;
    api: GridApi;
    columnApi: ColumnApi;
    context: TContext;

    static Create(valueFormatterParams: ValueFormatterParams): DoobValueFormatterParams {
        return {
            ...new DoobValueFormatterParams(),
            ...valueFormatterParams
        }
    }
}
