import { GridApi } from '@ag-grid-community/all-modules';
import { IContextMenuContext } from './IContextMenuContext';

export class DefaultContextMenuContext<T = any> implements IContextMenuContext {

    private _selectedData: Array<T>;
    get SelectedData(): Array<T> {
        return this._selectedData;
    }

    get SelectedCount() {
        return this.SelectedData.length;
    }

    get Any() {
        return this.SelectedCount > 0;
    }
    get Single() {
        return this.SelectedCount === 1;
    }

    get First() {
        return this.SelectedCount > 0 ? this.SelectedData[0] : null;
    }

    constructor(gridApi: GridApi, private mEvent: MouseEvent) {
        this._selectedData = gridApi.getSelectedNodes().map(n => n.data)
    }

    get IsShiftPressed() {
        return this.mEvent.shiftKey;
    }

}