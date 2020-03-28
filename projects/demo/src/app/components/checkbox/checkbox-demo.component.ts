import { Component } from "@angular/core";
import { AppUIService } from '../../app-ui.service';

@Component({
  templateUrl: './checkbox-demo.component.html',
  styleUrls: ['./checkbox-demo.component.scss']
})
export class CheckboxDemoComponent {


  Modes = `
<div class="ui form">
  <div class="grouped fields">
      <div class="field">
          <db-checkbox [checked]="true">Checkbox</db-checkbox>
      </div>
      <div class="field">
          <db-checkbox toggle>Toggle</db-checkbox>
      </div>
  </div>
</div>
`

  disableCheckbox = `
<div class="ui form">
  <div class="grouped fields">
      <div class="field">
          <db-checkbox disabled>Checkbox</db-checkbox>
      </div>
      <div class="field">
          <db-checkbox [toggle]="true" disabled [checked]="true">Toggle</db-checkbox>
      </div>
  </div>
</div>
`

  toggleCheckbox = `
<div class="ui form">
  <div class="inline fields">
      <div class="field">
          <db-checkbox [disabled]="stateToggle" [checked]="true">You can toggle my disabled State!</db-checkbox>
      </div>
      <div class="field">
          <db-checkbox [disabled]="stateToggle" toggle>You can toggle my disabled State!</db-checkbox>
      </div>
  </div>
  <div class="inline fields">
      <div class="field">
          <db-checkbox [readonly]="stateToggle">You can toggle my readonly State!</db-checkbox>
      </div>
      <div class="field">
          <db-checkbox [readonly]="stateToggle" toggle [checked]="true">You can toggle my readonly State!</db-checkbox>
      </div>
  </div>
  <div class="inline fields">
      <div class="field">
          <db-checkbox [toggle]="stateToggle">You can toggle my Mode!</db-checkbox>
      </div>
  </div>
  <div class="grouped fields">
      <div class="field">
          <div class="ui primary button" (click)="stateToggle = !stateToggle">Toggle State</div>
      </div>
  </div>
</div>
  `
  stateToggle: boolean = false;

  constructor(private appui: AppUIService) {
    appui.Set(c => {
      c.Header.Title = "Checkbox"
      c.Content.Scrollable = true;
      c.Header.Icon = "check square outline icon"
    })
  }
}
