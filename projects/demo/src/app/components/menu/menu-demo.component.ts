import { Component, ChangeDetectionStrategy, TemplateRef, ViewContainerRef, HostListener, ViewChild, ChangeDetectorRef, ElementRef, ComponentRef, ComponentFactoryResolver, OnChanges, SimpleChanges } from "@angular/core";
import { AppUIService } from '../../app-ui.service';
import { DemoExample } from '../../shared/components/part/example';
import { DoobOverlayService, ContextMenuContext } from '@local/cdk-helper';
import { MenuBuilder } from '@local/ui';

@Component({
    templateUrl: './menu-demo.component.html',
    styleUrls: ['./menu-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuDemoComponent {


    @ViewChild('contextMenu') contextMenu: TemplateRef<any>;

    @HostListener('contextmenu', ['$event'])
    OnContextMenu($event: MouseEvent) {
        this.contextMenuContext?.CloseContextMenu();
        this.contextMenuContext = this.overlay.OpenContextMenu($event, this.contextMenu, this.viewContainerRef, null);
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
<db-menu class="secondary db-context-menu">
    <db-header>Header</db-header>
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

    contextMenuExample: Array<DemoExample> = [
        {
            language: 'html',
            code: this.contextMenuExampleHTML
        }
    ]

    contextBuilder = new MenuBuilder({ Name: "Bernhard", enabled: false })
        .LinkChangeDetectorRef(this.cref)
        .SetClass("secondary db-context-menu")
        .AddItem(
            it => it.Header("Header"),
            (it, context) => it.Item("Toggle", "random")
                .OnClick(() => {
                    this.it1 = !this.it1;
                    this.it2 = !this.it2;
                    this.it3 = !this.it3;
                }),
            (it, context) => it.Item("Enable", "toggle on")
                .OnClick(() => {
                    this.it1 = true;
                    this.it2 = true;
                    this.it3 = true;
                }),
            (it, context) => it.Item("Disable", "toggle off")
                .OnClick(() => {
                    this.it1 = false;
                    this.it2 = false;
                    this.it3 = false;
                }),
            it => it.Divider().OnClick(() => console.log(this)),
            (it, context) => it.Item("Enable Toggle 1")
                .OnClick(() => this.it1 = true)
                .Hidden(() => this.it1),
            (it, context) => it.Item("Disable Toggle 1")
                .OnClick(() => this.it1 = false)
                .Hidden(() => !this.it1)
        )

    builder = new MenuBuilder({ Name: "Bernhard" })
        .SetClass("secondary db-context-menu")
        .AddItem(
            it => it.Header("Header"),
            it => it.Item("Enable", "toggle on"),
            it => it.Item("Disable", "toggle off"),
            it => it.Divider(),
            (it, context) => it.Item("Ende").OnClick((ev) => console.log(ev, context))
        )

    builderExample: Array<DemoExample> = [
        {
            language: 'html',
            code: `
<db-menu [builder]="builder"></db-menu>
`
        },
        {
            language: 'typescript',
            code: `
builder = new MenuBuilder({ Name: "Bernhard" })
    .SetClass("secondary db-context-menu")
    .AddItem(
        it => it.Header("Header"),
        it => it.Item("Enable", "toggle on"),
        it => it.Item("Disable", "toggle off"),
        it => it.Divider(),
        (it, context) => it.Item("Ende").OnClick((ev) => console.log(ev, context))
    )
`
        }
    ]


    it1 = false;
    it2 = false;
    it3 = false;

    constructor(private appUi: AppUIService,
        private overlay: DoobOverlayService,
        private viewContainerRef: ViewContainerRef,
        private cref: ChangeDetectorRef
    ) {

        appUi.Set(ui => {
            ui.Header.Title = "Menu"
            ui.Header.Icon = "list"
        })
    }

}
