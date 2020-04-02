import { BuilderBaseItem, BuilderHeaderItem } from '../shared/item';
import { MenuItemBuilder, MenuBaseItemBuilder } from './menu-item-builder';
import { ComponentRef, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';

export class MenuBuilder<T = any> {

    items: Array<BuilderBaseItem> = []
    class: string;
    changeDetectorRef: ChangeDetectorRef;

    constructor(private context?: T) {

    }

    AddItem(...items: ((builder: MenuItemBuilder, context) => MenuBaseItemBuilder)[]){
        let nItems = items.map(item => {
           let bbuilder = item(new MenuItemBuilder(), this.context)
           return <BuilderBaseItem>(<any>bbuilder).Build()
        })

        this.items = [...this.items, ...nItems];
        return this;
    }

    SetClass(value: string) {
        this.class = value;
        return this;
    }

    LinkChangeDetectorRef(value: ChangeDetectorRef) {
        this.changeDetectorRef = value;
        return this;
    }

}
