import { GridColumn } from './grid-column';
import { DoobDateCellRendererComponent } from './cell-renderer/date-cell-renderer.component';
import { DoobLabelCellRendererComponent } from './cell-renderer/label-cell-renderer.component';

export class GridColumnBuilder<T = any> {


    Default(field: string) {

        return GridColumn.Create(field)
            .Resizeable()
            .Sortable();

    }

    Date(field: string, showSeconds: boolean = false) {
        return GridColumn.Create(field)
            .SetRenderer(DoobDateCellRendererComponent)
            .SetRendererParams({ showSeconds: showSeconds })
            .Sortable()
    }

    Label(field: string) {
        return GridColumn.Create(field)
            .SetRenderer(DoobLabelCellRendererComponent)
            .Sortable()
    }

}


