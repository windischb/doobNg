import { Component, ChangeDetectionStrategy, Input, ElementRef, Output, EventEmitter, HostBinding, OnInit, ContentChildren, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DoobBaseItemComponent } from '../shared/item/base-item.component';

declare var $: any;

@Component({
    selector: 'db-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    host: {
        'class': "doob ui dropdown"
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DoobDropdownComponent,
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoobDropdownComponent  implements ControlValueAccessor, OnInit {

    @ContentChildren(DoobBaseItemComponent) Items: QueryList<DoobBaseItemComponent>;

    @Input() placeholder: string;

    private _fluid: boolean = false;
    @Input()
    @HostBinding('class.fluid')
    set fluid(value) {
        this._fluid = !!value;
    }
    get fluid() {
        return this._fluid
    }

    @HostBinding('class.item') isItem: boolean = false;

    selected$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    @Input()
    set selected(value: any) {

        this.selected$.next(value);
    }
    get selected() {
        return this.selected$.getValue();
    }
    @Output()
    selectedChange: EventEmitter<string> = new EventEmitter<string>();


    private _settings: {}
    settings$ = new BehaviorSubject<{}>(this._settings);
    @Input()
    set settings(value: {}) {
        this.settings$.next(value);
    }

    @HostBinding('class.disabled') isDisabled: boolean = false;
    @Input()
    set disabled(value: boolean) {
        this.isDisabled = value;
    }
    get disabled() {
        return this.isDisabled;
    }


    _multiple: boolean | string = false;
    @Input()
    @HostBinding('class.multiple')
    set multiple(value: boolean | string) {

        if (value === undefined || value === null) {
            this._multiple = true;
        } else if (value === false) {
            this._multiple = false;
        } else {
            this._multiple = value;
        }
        this.propagateChange();
    }
    get multiple() {
        return this._multiple
    }

    private _emptyAsNull: boolean;
    @Input()
    set emptyAsNull(value) {

        if (value === undefined || value === null) {
            this._emptyAsNull = true;
        } else if (value === false) {
            this._emptyAsNull = false;
        } else {
            this.emptyAsNull = true;
        }
    }

    destroy$ = new Subject();
    dropdownElement: any;

    constructor(private elementRef: ElementRef) {

    }

    ngOnInit() {

        var el = this.elementRef.nativeElement as HTMLElement;

        if (el.attributes.getNamedItem("fluid")) {
            this.fluid = true;
        }
        const multiple = el.attributes.getNamedItem("multiple")
        if (multiple) {
            this.multiple = multiple.value;
        }
    }

    ngAfterContentInit() {
        this.Items.forEach(element => {
            element.ParentComponent = 'dropdown';
        });
    }

    ngAfterViewInit() {



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
                        if (this._multiple && typeof this._multiple === 'string') {
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


    private lastSelection: any;
    SelectionChanged(value: any) {
        this.lastSelection = value;
        this.propagateChange(value);
    }


    propagateChange(value?: string) {

        if (this.isDisabled) {
            return;
        }

        value = value || this.lastSelection

        let result: any = value;
        if (this._multiple) {
            result = (result || "").split(',').filter(val => !!val)

            if (this.multiple && typeof this.multiple === 'string') {
                result = (<Array<any>>result).join(this.multiple)
            }
        }

        if (this.emptyAsNull) {
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

    setDisabledState?(disabled: boolean): void {
        this.disabled = disabled;
    }


}
