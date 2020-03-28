import { Component, ChangeDetectionStrategy, EventEmitter, QueryList, Input, ContentChildren, Output, ChangeDetectorRef, OnDestroy, AfterContentInit, AfterViewInit, ViewChild, ContentChild, ElementRef, Renderer2 } from "@angular/core";
import { DoobTabComponent } from './tab.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'db-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoobTabsComponent implements OnDestroy, AfterContentInit, AfterViewInit {

    @Input() mode: 'hide' | 'remove' = 'hide';

    @ContentChildren(DoobTabComponent) tabs: QueryList<DoobTabComponent>;
    @ViewChild('indicator', { static: true, read: ElementRef }) indicator: ElementRef;

    tabsSubject$: BehaviorSubject<Array<DoobTabComponent>> = new BehaviorSubject<Array<DoobTabComponent>>([]);
    tabs$ = this.tabsSubject$.asObservable();

    _activeTabIndex: number;
    @Output() activeTab = new EventEmitter<any>();
    @Output() activeTabIndex = new EventEmitter<number>();


    public IndicatorWidth: number = 0;
    public IndicatorLeft: number = 0;

    destroy$ = new Subject();
    constructor(private cref: ChangeDetectorRef, private readonly renderer: Renderer2) {

    }

    ngAfterContentInit() {

        this.tabs.changes.subscribe(tabs => {
            this.propagateTabs(tabs.toArray());
        });

        setTimeout(() => {
            this.tabs.forEach(tab =>
                tab.changed$.pipe(
                    takeUntil(this.destroy$)
                ).subscribe(t => {
                    this.SetIndicator(true)
                })
            )
            this.propagateTabs(this.tabs.toArray());
        }, 0);

    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.propagateTabs(this.tabs.toArray());
        }, 0);
    }

    ngOnDestroy() {
        this.destroy$.next();
    }


    propagateTabs(tabs: Array<DoobTabComponent>) {

        let _activeTabIndex = tabs.findIndex(t => t.active);

        if (_activeTabIndex == -1) {
            _activeTabIndex = 0;
        }
        this.Activate(_activeTabIndex);

    }


    public Activate(value: string | number) {

        setTimeout(() => {

            const byIndex = typeof value === 'number';
            const tabs = this.tabs.map((item, _index) => {
                if (!item.mode) {
                    item.mode = this.mode
                }
                const match = byIndex ? (value === _index) : (value === item.title);
                if (match) {
                    this._activeTabIndex = _index;
                    this.activeTab.emit(item.title);
                    this.activeTabIndex.emit(_index);
                    item.active = true;

                    return item;
                } else {
                    item.active = false;
                    return item;
                }
            });

            this.tabsSubject$.next(tabs);
            this.SetIndicator()
        }, 0);


    }


    private SetIndicator(notransition: boolean = false) {
        setTimeout(() => {
            if(notransition) {
                this.renderer.addClass(this.indicator.nativeElement, 'notransition');
            }
            const tabEl = document.getElementById(`tab${this._activeTabIndex}`);
            if (tabEl) {
                this.IndicatorWidth = tabEl.clientWidth
                this.IndicatorLeft = tabEl.offsetLeft
            }
            this.cref.detectChanges()
            this.renderer.removeClass(this.indicator.nativeElement, 'notransition');
        }, 0);
    }
}
