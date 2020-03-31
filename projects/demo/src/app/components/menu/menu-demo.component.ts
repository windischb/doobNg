import { Component, ChangeDetectionStrategy, TemplateRef, ViewContainerRef, HostListener, ViewChild } from "@angular/core";
import { AppUIService } from '../../app-ui.service';
import { DemoExample } from '../../shared/components/part/example';
import { DoobOverlayService, ContextMenuContext } from '@local/cdk-helper';

@Component({
    templateUrl: './menu-demo.component.html',
    styleUrls: ['./menu-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuDemoComponent {


    @ViewChild('contextMenu') contextMenu: TemplateRef<any>;
    @HostListener('contextmenu', ['$event'])
    OnContextMenu($event: MouseEvent ) {
        this.contextMenuContext?.CloseContextMenu();
        this.contextMenuContext = this.overlay.OpenContextMenu( $event, this.contextMenu, this.viewContainerRef, null);
    }

    contextMenuContext: ContextMenuContext;

    defaultMenuExample = `
<db-checkbox toggle #t1>Toggle</db-checkbox>
<db-menu>
    <div db-header>Header</div>
    <a db-item icon="toggle on" (click)="t1.checked=true" *ngIf="!t1.checked">Enable</a>
    <a db-item icon="toggle off icon" (click)="t1.checked=false" *ngIf="t1.checked">Disable</a>
    <db-divider></db-divider>
    <a db-item icon="edit">Edit</a>
</db-menu>
`

    secondaryMenuExample = `
<db-checkbox toggle #t2>Toggle</db-checkbox>
<db-menu class="secondary">
    <db-header>Header</db-header>
    <a db-item icon="toggle on" (click)="t2.checked=true" *ngIf="!t2.checked">Enable</a>
    <a db-item icon="toggle off icon" (click)="t2.checked=false" *ngIf="t2.checked">Disable</a>
    <db-divider></db-divider>
    <a db-item icon="edit">Edit</a>
</db-menu>
`

    contextMenuExampleHTML = `
<db-checkbox toggle #t3>Toggle</db-checkbox>
<db-menu class="secondary context-menu">
    <db-header style="background-color: #525e76; color: white;">Header</db-header>
    <a db-item icon="toggle on" (click)="t3.checked=true" *ngIf="!t3.checked">Enable</a>
    <a db-item icon="toggle off icon" (click)="t3.checked=false" *ngIf="t3.checked">Disable</a>
    <a db-item icon="edit">Edit</a>
    <db-divider></db-divider>
    <db-subitem name="Export As" on='hover'>
        <db-item icon="file excel outline">Excel</db-item>
        <db-item icon="file alternate outline">Csv</db-item>
        <db-item icon="file code outline">Html</db-item>
    </db-subitem>
</db-menu>
`

    contextMenuExampleCSS = `
.context-menu {
    box-shadow: 2px 2px 4px 1px rgba(82, 94, 118, 0.7)!important;
    background-color: whitesmoke!important;
    border: 1px solid whitesmoke!important;
}
`
    contextMenuExample: Array<DemoExample> = [
        {
            language: 'html',
            code: this.contextMenuExampleHTML
        },
        {
            language: 'css',
            code: this.contextMenuExampleCSS
        }
    ]

    constructor(private appUi: AppUIService, private overlay: DoobOverlayService, private viewContainerRef: ViewContainerRef) {
        appUi.Set(ui => {
            ui.Header.Title = "Menu"
            ui.Header.Icon = "list"
        })
    }

}
