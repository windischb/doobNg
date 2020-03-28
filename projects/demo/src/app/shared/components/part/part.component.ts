import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { DemoExample } from './example';

@Component({
    selector: 'demo-part',
    templateUrl: './part.component.html',
    styleUrls: ['./part.component.scss']
})
export class DemoPartComponent implements OnInit {

    @Input() title: string;

    private _example: Array<DemoExample>;
    @Input()
    set example(value: Array<DemoExample> | DemoExample | string) {
        if (value instanceof Array) {
            this._example = value;
        } else if (value instanceof DemoExample) {
            this._example = [value]
        } else {
            this._example = [{ language: 'html', code: value }]
        }
    }
    get example() {
        return this._example
    }

    show: boolean = false;

    ngOnInit() {

    }
}


