import { Component, ChangeDetectionStrategy, ViewChild, ViewContainerRef, ContentChildren, QueryList, AfterViewInit, Renderer2, ElementRef, Input, HostBinding, AfterContentInit } from "@angular/core";
import { DoobBaseItemComponent } from '../shared/item/base-item.component';

@Component({
    selector: 'db-menu',
    template: `<ng-content select="db-item, [db-item], db-divider, [db-divider], db-header, [db-header], db-subitem"></ng-content>`,
    styleUrls: ['./menu.component.scss'],
    host: {
        class: 'ui vertical menu'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoobMenuComponent implements AfterContentInit {


    @ContentChildren(DoobBaseItemComponent) Items: QueryList<DoobBaseItemComponent>;


    ngAfterContentInit() {
        console.log(this.Items)
        this.Items.forEach(element => {
            element.ParentComponentType = DoobMenuComponent
        });
    }

}
