import { Component } from '@angular/core';
import { AppUIService } from './app-ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  uiContext$ = this.uiService.UIContext$;

  constructor(private uiService: AppUIService) {

    uiService.SetDefault(ui => {
        ui.Footer.Show = false
        ui.Content.Scrollable = true
    })
  }
}
