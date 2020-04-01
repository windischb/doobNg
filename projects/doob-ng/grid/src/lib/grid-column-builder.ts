import { GridColumn } from './grid-column';

export class GridColumnBuilder<T = any> {


    DefaultColumn(field: string, header?: string) {

        return new GridColumn()
            .UseField(field)
            .UseHeader(header || field)
            .Resizeable()
            .Sortable();

    }


}
