import { Directive, ContentChildren, QueryList, AfterContentInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject, BehaviorSubject, Observable, merge, of, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, takeUntil, tap, mergeMap, mergeAll } from 'rxjs/operators';

@Directive({
    selector: '[dbCheckboxGroup]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: DoobCheckBoxGroup,
        multi: true
    }],

})
export class DoobCheckBoxGroup implements ControlValueAccessor, AfterContentInit, OnDestroy {

    @Input() disabled: boolean;
    @Input() returnType: 'string' | 'array' | 'object';

    private autoType: 'string' | 'array' | 'object';

    private _value: string | Array<string> | Object;
    @Input() set value(value: string | Array<string> | Object) {
        this._value = value;
        this.values$.next(value);
    }
    @Output() valueChange: EventEmitter<string | Array<string> | Object> = new EventEmitter<string | Array<string> | Object>();

    values$: BehaviorSubject<string | Array<string> | Object> = new BehaviorSubject<string | Array<string> | Object>(this._value);
    childCheckboxes$: Observable<Array<NzCheckboxComponent>>;

    
    @ContentChildren(NzCheckboxComponent, { descendants: true }) childCheckboxesQueryList: QueryList<NzCheckboxComponent>;
    constructor() {

    }

    destroy$ = new Subject();
    ngOnDestroy() {
        this.destroy$.next(true);
    }


    ngAfterContentInit() {

        /// Get List of Child Checkboxes, even when added or removed from DOM
        this.childCheckboxes$ = merge(
            of(this.childCheckboxesQueryList ? this.childCheckboxesQueryList.toArray() : null),
            this.childCheckboxesQueryList.changes.pipe(
                map((chkb: QueryList<NzCheckboxComponent>) => chkb.toArray())
            )
        ).pipe(
            distinctUntilChanged(),
            takeUntil(this.destroy$)
        );

        /// Set Value on Child Checkboxes
        combineLatest(this.childCheckboxes$, this.values$).pipe(
            tap(([boxes, value]) => {


                if (!value) {
                    this.autoType = 'object';
                    return;
                }


                let valueObj = {};
                if (typeof value === 'string' || value instanceof String) {
                    valueObj = value.split(',').reduce((result, current) => {
                        result[current.trim()] = true;
                        return result;
                    }, {});
                    this.autoType = 'string';
                } else if (value instanceof Array) {
                    valueObj = value.reduce((result, current) => {
                        result[current.trim()] = true;
                        return result;
                    }, {});
                    this.autoType = 'array';
                } else {
                    valueObj = value;
                    this.autoType = 'object';
                }


                const objectKeys = Object.keys(valueObj);

                boxes.forEach(box => {
                    if (objectKeys.indexOf(box.nzValue) !== -1) {
                        box.nzChecked = valueObj[box.nzValue];
                    } else {
                        box.nzChecked = false;
                    }

                });

            }),

            takeUntil(this.destroy$)
        ).subscribe();

        const subscribeToChanges = this.childCheckboxes$.pipe(
            mergeMap(boxes => {
                return boxes.map(box => {
                    return box.nzCheckedChange.pipe(
                        map(() => {
                            const statusObject = boxes.map(_b => ({ name: _b.nzValue, checked: _b.nzChecked })).reduce((result, item) => {
                                result[item.name] = item.checked;
                                return result;
                            }, {});

                            return statusObject;
                        })
                    );
                });
            }),
            mergeAll(),
            takeUntil(this.destroy$)
        );

        /// Check Child Checkboxes in case of values exists before Subscribe to changes
        const check = this.childCheckboxes$.pipe(
            map(boxes => {
                const statusObject = boxes.map(_b => ({ name: _b.nzValue, checked: _b.nzChecked })).reduce((result, item) => {
                    result[item.name] = item.checked;
                    return result;
                }, {});

                return statusObject;
            }),
            takeUntil(this.destroy$)
        );

        /// emit Status of all Checkboxes in Scope
        merge(subscribeToChanges, check).pipe(
            takeUntil(this.destroy$)
        ).subscribe(value => this.propagateChange(value));



    }

    propagateChange(value: Object) {

        let emitValue;

        switch (this.returnType || this.autoType) {
            case 'object': {
                emitValue = value;
                break;
            }
            case 'array': {
                emitValue = Object.entries(value).filter(([key, _value]) => _value === true).map(([key, _value]) => key);

                break;
            }
            case 'string': {
                emitValue = Object.entries(value).filter(([key, _value]) => _value === true).map(([key, _value]) => key).join(',');
                break;
            }
        }

        this.valueChange.emit(emitValue);
        this.registered.forEach(fn => {
            fn(emitValue);
        });
    }


    writeValue(value: Array<string>): void {
        this.value = value;
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

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    
}