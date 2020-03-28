import { Component, ChangeDetectionStrategy, Sanitizer, SecurityContext } from "@angular/core";
import { AppUIContext } from '../../app-ui-context';
import { AppUIService } from '../../app-ui.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    templateUrl: './dropdown-demo.component.html',
    styleUrls: ['./dropdown-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownDemoComponent {

    simpleExample = `
<db-dropdown class="selection" placeholder="Select..." #dd>
    <db-dropdown-item value="1st">First</db-dropdown-item>
    <db-dropdown-item value="2nd">Second</db-dropdown-item>
    <db-dropdown-item value="3rd">Third</db-dropdown-item>
    <db-dropdown-divider></db-dropdown-divider>
    <db-dropdown-item value="cat" icon="cat">Cat</db-dropdown-item>
    <db-dropdown-item value="dog" icon="dog">Dog</db-dropdown-item>
    <db-dropdown-item value="hippo" icon="hippo">Hippo</db-dropdown-item>
</db-dropdown>
<div *ngIf="dd.selectedChange | async; let val">
    <pre>{{val}}</pre>
</div>
    `

    fluidExample = `
<db-dropdown fluid class="selection" placeholder="Select..." #dd2>
    <db-dropdown-item value="Baseball" icon="baseball ball">Baseball</db-dropdown-item>
    <db-dropdown-item value="Basketball" icon="basketball ball">Basketball</db-dropdown-item>
    <db-dropdown-item value="Football" icon="football ball">Football</db-dropdown-item>
</db-dropdown>
<div *ngIf="dd2.selectedChange | async; let val">
    <pre>{{val}}</pre>
</div>
    `

    multiSelectExample = `
<db-dropdown [fluid]="toggle.checked" [multiple]="delimiter || true" class="selection" placeholder="Select..." #dd3>
    <db-dropdown-item value="Baseball" icon="baseball ball">Baseball</db-dropdown-item>
    <db-dropdown-item value="Basketball" icon="basketball ball">Basketball</db-dropdown-item>
    <db-dropdown-item value="Football" icon="football ball">Football</db-dropdown-item>
</db-dropdown>
<div>
    <div class="ui small input" style="padding-right: 30px;">
        <input placeholder="change delimiter" #inp (keyup)="delimiter = inp.value" />
    </div>
    <db-checkbox toggle #toggle>Fluid</db-checkbox>
</div>
<div *ngIf="dd3.selectedChange | async; let val">
    <pre>{{val | json}}</pre>
</div>

`

    delimiter: string = null;
    constructor(private appUI: AppUIService) {
        appUI.Set(c => {
            c.Header.Title = "Dropdown"
            c.Header.Icon = "list alternate outline"
        })
    }

}
