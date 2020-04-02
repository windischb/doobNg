import { Component, ChangeDetectionStrategy } from "@angular/core";
import { SimpleAgGridDemo } from './simpleAgGrid.demo';
import { GridBuilder } from '@local/grid';
import { BehaviorSubject } from 'rxjs';
import { DemoExample } from '../../shared/components/part/example';


@Component({
    templateUrl: './grid-demo.component.html',
    styleUrls: ['./grid-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridDemoComponent {


    simpleGridSelected$ = new BehaviorSubject<any>(null);
    simpleGrid = new GridBuilder()
        .SetColumns(
            c => c.DefaultColumn('make', "Name"),
            c => c.DefaultColumn('model', "Model"),
            c => c.DefaultColumn('price')
        )
        .SetGridOptions({
            rowSelection: 'multiple',
            colResizeDefault: 'shift',
            onSelectionChanged: ev => {
                this.simpleGridSelected$.next(ev.api.getSelectedRows());
            }
        })
        .SetData([
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford1", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 }
        ])
        .OnCellContextMenu(event => {
            console.log(event)
        })
        .OnViewPortContextMenu((event, api) => {
            console.log(event, api)
        });


    simpleGridExample: Array<DemoExample> = [
        {
            language: "html",
            code: `
<ag-grid-angular [dbGrid]="simpleGrid" style="height: 300px;" class="ag-theme-balham"></ag-grid-angular>
<div class="ui buttons">
    <div class="ui button" (click)="SelectAll()">Select All</div>
    <div class="ui button" (click)="DeSelectAll()">Deselect All</div>
</div>

<pre>{{simpleGridSelected$ | async | json}}</pre>
`
        },
        {
            language: "typescript",
            code: `
simpleGridSelected$ = new BehaviorSubject<any>(null);
simpleGrid = new GridBuilder()
    .SetColumns(
        c => c.DefaultColumn('make', "Name"),
        c => c.DefaultColumn('model', "Model"),
        c => c.DefaultColumn('price')
    )
    .SetGridOptions({
        rowSelection: 'multiple',
        colResizeDefault: 'shift',
        onSelectionChanged: ev => {
            this.simpleGridSelected$.next(ev.api.getSelectedRows());
        }
    })
    .SetData([
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford1", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 }
    ]);

SelectAll() {
    this.simpleGrid.SetGridApi(api => api.selectAll());
}
DeSelectAll() {
    this.simpleGrid.SetGridApi(api => api.deselectAll());
}
`
        }
    ]

    constructor() {

    }



    SelectAll() {
        this.simpleGrid.SetGridApi(api => api.selectAll());
    }
    DeSelectAll() {
        this.simpleGrid.SetGridApi(api => api.deselectAll());
    }
}
