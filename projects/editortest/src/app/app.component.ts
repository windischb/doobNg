import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { EndpointRulesService } from './endpoint-rules.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    form: FormGroup;

    typings$ = this.rulesService.typings$.pipe(
        tap(t => console.log(t))
    );

    imports$ = this.rulesService.imports$.pipe(
        tap(t => console.log(t))
    );

    constructor(private fb: FormBuilder, private rulesService: EndpointRulesService) {

        this.form = this.fb.group({
            Language: ["TypeScript"],
            SourceCode: []
        });

    }


}
