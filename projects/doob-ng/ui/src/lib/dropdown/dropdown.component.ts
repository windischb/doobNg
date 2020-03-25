import { Component, ChangeDetectionStrategy, ContentChildren, QueryList, Input, ViewChild, ElementRef, ViewContainerRef, Output, EventEmitter, HostBinding, OnInit } from '@angular/core';
import { DoobBaseComponent } from './base.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare var $: any;

@Component({
    selector: 'doob-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    host: {
        'class': "doob ui dropdown"
    },
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: DoobDropdownComponent,
        multi: true
    }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoobDropdownComponent implements ControlValueAccessor, OnInit {


    @Input() placeholder: string;

    @ViewChild('template', { read: ViewContainerRef }) public template: ViewContainerRef;
    @ContentChildren(DoobBaseComponent) items: QueryList<DoobBaseComponent>;

    @HostBinding('class') class;

    @HostBinding('class.multiple') _multipleClass: boolean = false;


    private _selected: string;
    selected$: BehaviorSubject<any> = new BehaviorSubject<any>(this._selected);
    @Input()
    set selected(value: any) {
        this._selected = value;
        this.selected$.next(value);
    }
    get selected() {
        return this._selected;
    }
    @Output()
    selectedChange: EventEmitter<string> = new EventEmitter<string>();


    private _settings: {}
    settings$ = new BehaviorSubject<{}>(this._settings);
    @Input()
    set settings(value: {}) {
        this.settings$.next(value);
    }

    private _disabled = false;
    disabled$ = new BehaviorSubject<boolean>(false);
    @Input()
    set disabled(value: boolean) {
        this._disabled = value;
        this.disabled$.next(value);
    }
    get disabled() {
        return this._disabled;
    }


    private _multiple: string;
    @Input()
    set multiple(value) {

        if (value === undefined || value === null) {
            this._multipleClass = true;
        } else if (value === false) {
            this._multipleClass = false;
        } else {
            this._multiple = `${value}`;
            this._multipleClass = true;
        }
    }

    private _emptyAsNull: boolean;
    @Input()
    set emptyAsNull(value) {

        if (value === undefined || value === null) {
            this._emptyAsNull = true;
        } else if (value === false) {
            this._emptyAsNull = false;
        } else {
            this._emptyAsNull = true;
        }
    }

    destroy$ = new Subject();
    dropdownElement: any;

    constructor(private elementRef: ElementRef) {

    }

    ngOnInit() {


    }

    ngAfterViewInit() {

        this.items.forEach(item => {
            this.template.element.nativeElement.appendChild(item.viewContainerRef.element.nativeElement)
        })

        this.dropdownElement = $(this.elementRef.nativeElement);

        this.SubscribeSettings();
        this.SubscribeSelected();

    }

    private SubscribeSettings() {
        this.settings$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(settings => {
            this.dropdownElement.dropdown(settings);
        });
    }

    private SubscribeSelected() {
        this.selected$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(sel => {

            if (this.dropdownElement) {
                if (sel) {
                    let val = sel;
                    if (typeof val === 'string') {
                        if (this._multiple) {
                            val = val.split(this._multiple).map(el => el.trim());
                        }
                    }
                    setTimeout(() => {
                        this.dropdownElement.dropdown('set exactly', val);
                    }, 0);
                } else {
                    setTimeout(() => {
                        this.dropdownElement.dropdown('clear');
                    }, 0);
                }
            }

        });
    }


    SelectionChanged(value: any) {
        this.propagateChange(value);
    }


    propagateChange(value: string) {

        if (this.disabled) {
            return;
        }

        let result: any = value;
        if (this._multipleClass) {
            result = (result || "").split(',').filter(val => !!val)

            if (this._multiple) {
                result = (<Array<any>>result).join(this._multiple)
            }
        }

        if (this._emptyAsNull) {
            if (typeof result === 'string') {
                if (!(result && result.trim())) {
                    result = null;
                }
            } else {
                if ((<Array<any>>result).length == 0) {
                    result = null;
                }
            }
        }


        this.selectedChange.emit(result);
        this.registered.forEach(fn => {
            fn(result);
        });
    }

    writeValue(obj: any): void {
        this.selected = obj;
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
