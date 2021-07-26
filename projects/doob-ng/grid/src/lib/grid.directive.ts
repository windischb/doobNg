import { Directive, Input, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AgGridAngular } from "@ag-grid-community/angular";
import { GridBuilder, GridBuilderOptions } from './grid-builder';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: 'ag-grid-angular[dbGrid]',
    exportAs: 'dbGrid',
    host: {
        style: `
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        `
    }
})
export class DoobGridDirective implements OnDestroy, OnInit {

    builderOptions: GridBuilderOptions;

    private DataObservable$: Observable<[]>;

    @Input()
    set dbGrid(value: GridBuilder) {

        this.aggrid.gridOptions = value.Build();
        value._internalSetGrid(this.aggrid);
        this.builderOptions = (<any>value).BuilderOptions
        this.DataObservable$ = (<any>value).DataObservable$
    }

    @Input()
    set data(value: Array<any>) {

    }

    @HostListener('contextmenu', ['$event'])
    OnViewPortContextMenu($event: MouseEvent) {

        if ($event.ctrlKey) {
            return;
        }

        $event.preventDefault();

        const targetElement = $event.target as HTMLElement;
        const targetIsViewPort = targetElement.classList.contains("ag-center-cols-viewport");

        if (this.builderOptions?.OnViewPortContextMenu && targetIsViewPort) {
            this.builderOptions.OnViewPortContextMenu($event, this.aggrid.api);
        }

    }

    @HostListener('click', ['$event'])
    OnViewPortClick($event: MouseEvent) {

        if ($event.ctrlKey) {
            return;
        }

        

        const targetElement = $event.target as HTMLElement;
        const targetIsViewPort = targetElement.classList.contains("ag-center-cols-viewport");

        if (this.builderOptions?.OnViewPortClick && targetIsViewPort) {
            $event.preventDefault();
            this.builderOptions.OnViewPortClick($event, this.aggrid.api);
        }

    }

    constructor(private aggrid: AgGridAngular) {
    }

    destroy$ = new Subject();
    ngOnDestroy(): void {
        this.destroy$.next();
    }

    ngOnInit(): void {
        this.aggrid.gridReady.pipe(
            takeUntil(this.destroy$)
        ).subscribe(grid => {
            if (this.DataObservable$) {
                this.DataObservable$.pipe(
                    takeUntil(this.destroy$)
                ).subscribe(data => {
                    this.aggrid.api.setRowData(data);
                })
            }
        })

    }

}
