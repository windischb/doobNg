import { Component } from "@angular/core";
import { AppUIService } from '../../app-ui.service';

@Component({
    templateUrl: './accordion-demo.component.html',
    styleUrls: ['./accordion-demo.component.scss']
})
export class AccordionDemoComponent {

    simpleOpen: boolean = false;

    simpleExample = `
<div class="ui buttons">
    <div class="ui primary button" (click)="simpleOpen = true">Open</div>
    <div class="ui button" (click)="simpleOpen = !simpleOpen">Toggle</div>
    <div class="ui secondary button" (click)="simpleOpen = false">Close</div>
</div>
<db-accordion [open]="simpleOpen">
    <h1>Hidden Text</h1>
    <p>Her I'am!</p>
</db-accordion>
    `
    constructor(private appui: AppUIService) {
        appui.Set(c => {
            c.Header.Title = "Accordion"
            c.Content.Scrollable = true;
            c.Header.Icon = "map outline rotated icon"
        })
    }

}
