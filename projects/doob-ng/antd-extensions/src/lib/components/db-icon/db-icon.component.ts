import { Input, Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: 'db-icon',
    template: `
    <i *ngIf="type == 'ant' && (icon$ | async)" nz-icon [nzType]="(icon$ | async)" [nzTheme]="theme" style="width:inherit" [nzRotate]="rotate"></i>
    <fa-icon *ngIf="type == 'fa'  && (icon$ | async)" nz-icon [icon]="(icon$ | async)" style="width:inherit" [rotate]="rotate"></fa-icon>
    `,
    styles: [
    `
    :host {
        display: inline-grid
    }
    `
    ]
})
export class DoobIconComponent {

    @Input() type: "ant" | "fa" = "ant";
    @Input() theme: string;
    @Input() rotate: number = 0;

    private _icon: string;

    private iconSubject$ = new BehaviorSubject<string>('');
    icon$ = this.iconSubject$.pipe(
        map(ico => {
            
            if(this.type == 'ant') {
                return ico;
            }

            if(this.theme) {
                return [this.theme, this.icon]
            } else {
                return this.icon;
            }

        })
    );

    @Input()
    set icon(value: string) {
        
        this.theme = null;
        if (!value) {
            this._icon = null;
            return;
        }

        if (value.startsWith('fa#')) {
            this.type = "fa";
            value = value.substring(3);

            if (value.includes('|')) {
                this.theme = value.split('|')[0];
                this._icon = value.split('|')[1]
            } else {
                this._icon = value;
            }
            
        } else {
            this.type = "ant",
            this._icon = value;
        }
    }

    // get icon() {
    //     return this._icon;
    // }

    // get faIcon() {

    //     if(this.theme) {
    //         return [this.theme, this.icon]
    //     } else {
    //         return this.icon;
    //     }
    // }

    // get nzIcon() {
    //     return this.icon;
    // }
    
}
