import { GridApi } from '@ag-grid-community/all-modules';

export interface IContextMenuContext<T = any> {
    readonly SelectedData: Array<T>;
    readonly SelectedCount: number;
    readonly Any: boolean;
    readonly Single: T;
    readonly First: T;
    readonly IsShiftPressed: boolean;
    readonly GridApi: GridApi;
}
