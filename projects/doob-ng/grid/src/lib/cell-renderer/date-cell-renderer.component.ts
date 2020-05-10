import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'db-date-cell',
    template: `
    <div>
        <span>{{date | date:'dd.MM.y HH:mm' }}</span><span *ngIf="showSeconds" class="seconds"> {{date | date:'ss' }}</span>
    </div>`,
    styles: [
        `
        .seconds {
            font-size: 0.8em;
            color: #797979;
        }
        `
    ]
})
export class DoobDateCellRendererComponent implements ICellRendererAngularComp {

    public date: Date;
    public showSeconds: boolean;

    agInit(params: any): void {
        this.date = params.value;

        const showSeconds = params['showSeconds'];
        this.showSeconds = !!showSeconds

    }

    refresh(): boolean {
        return true;
    }

}
