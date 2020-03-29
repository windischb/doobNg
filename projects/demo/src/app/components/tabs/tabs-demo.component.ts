import { Component, ChangeDetectionStrategy } from "@angular/core";
import { AppUIService } from '../../app-ui.service';

@Component({
    templateUrl: './tabs-demo.component.html',
    styleUrls: ['./tabs-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsDemoComponent {


    simpleTabsExample = `
<div style="height: 100px;">
    <db-tabs>
        <db-tab title="Files" icon="file alternate outline" style="background-color: azure;">
            Content of First Tab
        </db-tab>
        <db-tab title="Lists" icon="list ol">
            Content of Second Tab
        </db-tab>
        <db-tab title="Debug" icon="bug" style="padding: 20px; font-size:1.5em">Debug Information</db-tab>
    </db-tabs>
</div>
    `

    constructor(private appUI: AppUIService) {
        appUI.Set(ui => {
            ui.Header.Title = "Tabs"
        })
    }
}
