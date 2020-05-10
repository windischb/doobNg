import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/all-modules';


@Component({
    selector: 'db-labels-cell',
    template: `<div *ngFor="let label of labels" class="ui label db-label">{{label}}</div>`,
    styles: [
        `
    .db-label {
        font-weight: normal!important;
        padding: .2833em .333em!important;
        margin: 0px .5px!important;
        font-size: smaller;
    }
    `
    ]
})
export class DoobLabelCellRendererComponent implements ICellRendererAngularComp {

    public labels: Array<any> = [];

    agInit(params: ICellRendererParams): void {

        const val = params.valueFormatted || params.value;
        if (val instanceof Array) {
            this.labels = val;
        } else {
            const separator = params['separator'] ? params['separator'] : ',';
            this.labels = `${val}`.split(separator).map(v => v.trim());
        }

    }

    refresh(): boolean {
        return true;
    }

}


