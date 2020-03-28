import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'db-checkbox',
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoobCheckboxComponent implements ControlValueAccessor, OnInit {

    @Input() label: string;
    @Input() name: string;
    @Input() readonly = false;

    private checkedSubject$ = new BehaviorSubject(false);
    checked$ = this.checkedSubject$.asObservable()
    @Input()
    get checked() {
        return this.checkedSubject$.getValue();
    }

    set checked(value: boolean) {
        this.checkedSubject$.next(!!value);
    }

    @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _disabled: boolean = false;
    @Input()
    get disabled() {
        return this._disabled;
    };
    set disabled(value: any) {
        if (value === null || value === undefined || value === false) {
            this._disabled = false
        } else {
            this._disabled = !!value
        }
    }

    @Input()
    @HostBinding('class.toggle') toggle: boolean;

    @HostBinding('class.cursor-pointer') _cursorpointer: boolean;
    @HostBinding('class.cursor-default') _cursordefault: boolean;

    @HostListener('click', ['$event'])
    clicked($event: MouseEvent) {
        if (!this.disabled && !this.readonly) {
            this.checked = !this.checked;
            this.propagateChange(this.checked);
        }
    }

    constructor(private element: ElementRef) {

    }

    ngOnInit(): void {

        var el = this.element.nativeElement as HTMLElement;
        if (el.attributes.getNamedItem("disabled")) {
            this.disabled = true;
        }
        if (el.attributes.getNamedItem("toggle")) {
            this.toggle = true;;
        }
        //this._toggle = this.mode === 'toggle';
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

    private registered = [];
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
