import { Component, ChangeDetectionStrategy, ContentChildren, QueryList, AfterContentInit, Input, HostBinding, OnChanges, ChangeDetectorRef, ApplicationRef } from "@angular/core";
import { DoobBaseItemComponent } from '../shared/item/base-item.component';
import { BuilderBaseItem } from '../shared/item/builder-base-item';
import { Subject, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MenuBuilder } from './menu-builder';

@Component({
    selector: 'db-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    host: {
        class: 'ui vertical menu'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoobMenuComponent implements AfterContentInit {

    private itemsSubject$ = new BehaviorSubject<Array<BuilderBaseItem>>(null)
    items$ = this.itemsSubject$.asObservable()
        .pipe(map(items => items?.filter(item => !item.hidden())))

    private menuBuilder: MenuBuilder;
    @Input()
    set builder(value: MenuBuilder) {
        this.menuBuilder = value;

        this.buildMenu();

    }

    @HostBinding('class') class: string;

    @ContentChildren(DoobBaseItemComponent) childItems: QueryList<DoobBaseItemComponent>;

    constructor(private cref: ChangeDetectorRef, private appRef: ApplicationRef) {

    }

    ngAfterContentInit() {

        this.childItems.forEach(element => {
            element.ParentComponent = 'menu'
        });
    }

    buildMenu() {
        if(this.menuBuilder) {
            this.itemsSubject$.next(this.menuBuilder.items);
            if(this.menuBuilder.class) {
                this.class = this.menuBuilder.class;
            }
        }
    }

    OnClick($event: MouseEvent, item: BuilderBaseItem) {
        if(item.onClick) {
            item.onClick($event);
            this.buildMenu();
            this.menuBuilder?.changeDetectorRef?.detectChanges()
        }
    }
}
