import { Component } from '@angular/core';
import { AppUIService } from './app-ui.service';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  uiContext$ = this.uiService.UIContext$;

  get isDev() {
      return isDevMode();
  }

  constructor(private uiService: AppUIService) {

    uiService.SetDefault(ui => {
        ui.Footer.Show = false
        ui.Content.Scrollable = true
    })
  }
}
