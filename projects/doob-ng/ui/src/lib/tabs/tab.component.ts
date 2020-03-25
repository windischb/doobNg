import { Component, ChangeDetectionStrategy, Input, TemplateRef, ViewChild, ElementRef, HostBinding } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';
import { SafeStyle } from '@angular/platform-browser';

@Component({
    selector: 'doob-tab',
    templateUrl: './tab.component.html',
    styles: [`

    :host {
        height: 100%;
        position: relative;
        flex-grow:1;
        overflow: hidden;
        flex-direction: column;
        display: none
    }

    :host.visible {
        display: flex
    }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoobTabComponent {



    @Input() mode: 'hide' | 'remove' | null = null;
    @Input() content: TemplateRef<any>;

    @HostBinding('class.visible') visible: boolean = false;

    title$ = new BehaviorSubject<string>(null);
    @Input()
    set title(value: string) {
        this.title$.next(value);
        this.changed$.next();
    }

    icon$ = new BehaviorSubject<string>(null);
    @Input()
    set icon(value: string) {
        this.icon$.next(value);
        this.changed$.next();
    }

    visible$ = new BehaviorSubject<boolean>(false)
    @Input()
    set active(value: boolean) {
        this.visible = !!value;
        this.visible$.next(value);
    }

    get active(): boolean {
        return this.visible;
    }

    changed$ = new Subject();

    constructor(private element: ElementRef) {

    }


}
