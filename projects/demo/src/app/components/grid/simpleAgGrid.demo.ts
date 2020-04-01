import { GridOptions, GridReadyEvent } from '@ag-grid-community/all-modules';

export class SimpleAgGridDemo {

    gridOptions = <GridOptions>{
        onGridReady: (event: GridReadyEvent) => {
            event.api.sizeColumnsToFit();
        }
    };

    columnDefs = [
        {headerName: "Make", field: "make"},
        {headerName: "Model", field: "model"},
        {headerName: "Price", field: "price"}
    ];

    rowData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ];

    example = `
<ag-grid-angular db-grid style="height: 300px;" class="ag-theme-balham" [gridOptions]="simplrGridDemo.gridOptions"
    [columnDefs]="simplrGridDemo.columnDefs" [rowData]="simplrGridDemo.rowData">
</ag-grid-angular>
    `
}
