import { BuilderHeaderItem, BuilderBaseItem, BuilderItem, BuilderDividerItem } from '../shared/item';

export class MenuItemBuilder {

    Header(content: string | (() => string)): MenuBaseItemBuilder {
        let header = new BuilderHeaderItem();
        if(content instanceof Function) {
            header.content = content;
        } else {
            header.content = () => content;
        }
        return new MenuBaseItemBuilder(header);
    }

    Item(content: string | (() => string), icon?: string | (() => string)): MenuBaseItemBuilder {
        let item = new BuilderItem();

        if(content instanceof Function) {
            item.content = content;
        } else {
            item.content = () => content;
        }

        if(icon instanceof Function) {
            item.icon = icon;
        } else {
            item.icon = () => icon;
        }

        return new MenuBaseItemBuilder(item);
    }

    Divider() {
        let divider = new BuilderDividerItem()
        return new MenuBaseItemBuilder(divider);
    }

}

export class MenuBaseItemBuilder {


    constructor(private item: BuilderBaseItem) {

    }

    Hidden(value?: boolean | (() => boolean)) {
        if(value === null || value === undefined) {
            value = true;
        }
        if(value instanceof Function) {
            this.item.hidden = value;
        } else {
            let b = value;
            this.item.hidden = () => b;
        }

        return this;
    }

    Disabled(value?: boolean | (() => boolean)) {
        if(value === null || value === undefined) {
            value = true;
        }
        if(value instanceof Function) {
            this.item.disabled = value;
        } else {
            let b = value;
            this.item.disabled = () => b;
        }
        return this;
    }

    SetStyle(value: {} | (() => {})) {
        if(value instanceof Function) {
            this.item.style = value;
        } else {
            let b = value;
            this.item.style = () => b;
        }
        return this;
    }

    SetClass(value: string | (() => string)){
        if(value instanceof Function) {
            this.item.class = value;
        } else {
            let b = value;
            this.item.class = () => b;
        }
        return this;
    }

    OnClick(value: (($event: MouseEvent) => void)) {
        this.item.onClick = value || (() => null);
        return this;
    }


    private Build() {
        return this.item;
    }
}
