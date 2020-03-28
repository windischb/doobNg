import { Component, ChangeDetectionStrategy } from "@angular/core";
import { DemoExample } from '../../shared/components/part/example';
import { AppUIService } from '../../app-ui.service';
import { TypeScriptDemo } from './typescript-demo';
import { PowershellDemo } from "./powershell-demo";

@Component({
    templateUrl: './editor-demo.component.html',
    styleUrls: ['./editor-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorDemoComponent {

    typescriptEditor = TypeScriptDemo.Editor;
    typescriptCode = TypeScriptDemo.Code;
    typescriptEditorExamples: Array<DemoExample> = TypeScriptDemo.Examples;

    powershellEditor = PowershellDemo.Editor;
    powershellScriptCode = PowershellDemo.Code;
    powershellEditorExamples = PowershellDemo.Examples


    constructor(private appUI: AppUIService) {
        appUI.Set(c => {
            c.Header.Title = 'Editor';
            c.Header.SubTitle = "(Monaco Editor)"
            c.Header.Icon = "terminal"
            c.Content.Scrollable = true;
        })
    }
}
