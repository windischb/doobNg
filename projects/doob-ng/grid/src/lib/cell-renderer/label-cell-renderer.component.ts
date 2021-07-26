import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/all-modules';


@Component({
    selector: 'db-labels-cell',
    template: `<div *ngFor="let label of labels" [ngClass]="getLabelClass(label)" [ngStyle]="getLabelStyle(label)">{{label}}</div>`,
    styles: []
})
export class DoobLabelCellRendererComponent implements ICellRendererAngularComp {

    public labels: Array<any> = [];

    private _labelClass: string | ((value: string) => string);
    private _labelStyle: {} | ((value: {}) => {});

    agInit(params: ICellRendererParams): void {

        const val = params.valueFormatted || params.value;
        if (val instanceof Array) {
            this.labels = val;
        } else {
            const separator = params['separator'] ? params['separator'] : ',';
            this.labels = `${val}`.split(separator).map(v => v.trim());
        }

        this._labelClass = params['labelClass'];
        this._labelStyle = params['labelStyle'];

    }

    refresh(): boolean {
        return true;
    }

    public getLabelClass(label: string) {
        if(!this._labelClass) {
            return null
        }

        if (this._labelClass instanceof Function) {
            return this._labelClass(label);
        } else {
            return this._labelClass;
        }
    }

    public getLabelStyle(label: string) {
        if(!this._labelClass) {
            return null
        }

        if (this._labelStyle instanceof Function) {
            return this._labelStyle(label);
        } else {
            return this._labelStyle;
        }
    }

}


