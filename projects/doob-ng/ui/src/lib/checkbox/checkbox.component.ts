import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'doob-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: DoobCheckboxComponent,
        multi: true
    }],
    host: {
        class: 'ui checkbox'
    },
    changeDetection: ChangeDetectionStrategy.Default
})
export class DoobCheckboxComponent implements ControlValueAccessor, OnInit {

    @Input() label: string;
    @Input() name: string;
    @Input() clickable = true;
    @Input() disabled: boolean;
    @Input() mode: "checkbox" | "toggle" = "checkbox"

    private _checked: boolean = false;
    private checkedSubject$ = new BehaviorSubject<boolean>(this._checked)
    checked$ = this.checkedSubject$.asObservable()
    @Input()
    get checked() {
        return this._checked;
    }

    set checked(checked: boolean) {
        this._checked = !!checked;
        this.checkedSubject$.next(this._checked);
    }

    @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostBinding('class.toggle') _toggle: boolean;
    @HostBinding('class.cursor-pointer') _cursorpointer: boolean;
    @HostBinding('class.cursor-default') _cursordefault: boolean;

    @HostListener('click', ['$event'])
    clicked($event: MouseEvent) {
        if (!this.disabled && this.clickable) {
            this.checked = !this.checked;
            this.propagateChange(this.checked);
        }
    }

    constructor() { }

    ngOnInit(): void {

        this._toggle = this.mode === 'toggle';
        this._cursorpointer = !this.disabled;
        this._cursordefault = this.disabled;
    }

    propagateChange(value: any) {

        this.checkedChange.emit(value);
        this.registered.forEach(fn => {
            fn(value);
        });
    }

    writeValue(obj: any): void {
        this.checked = obj;
    }

    registered = [];
    registerOnChange(fn: any): void {
        if (this.registered.indexOf(fn) === -1) {
            this.registered.push(fn);
        }
    }

    onTouched = () => { };
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

}
