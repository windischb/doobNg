import { Component, ViewContainerRef, OnInit, HostBinding } from "@angular/core";
import { DoobBaseItemComponent } from './base-item.component';
import { DoobDropdownComponent } from '../../dropdown/dropdown.component';
import { DoobMenuComponent } from '../../menu/menu.component';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'db-header, [db-header]',
    templateUrl: './header.component.html',
    providers: [{ provide: DoobBaseItemComponent, useExisting: DoobHeaderComponent }],
    host: {
        class: 'db-header'
    }
})
export class DoobHeaderComponent extends DoobBaseItemComponent implements OnInit {

    TypeName: string = 'DoobHeaderComponent';

    @HostBinding('class.header') header: boolean = false;
    @HostBinding('class.item') item: boolean = false;

    constructor(public viewContainerRef: ViewContainerRef) {
        super()
    }


    ngOnInit() {
        this.ParentComponentType$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(type => {
            this.header = true
            this.item = type === DoobMenuComponent

        })

    }

}
