import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { fromEvent, combineLatest, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, tap, combineAll, mergeAll } from 'rxjs/operators';

@Directive({
    selector: '[dbOnKey]'
})
export class DoobOnKeyDirective implements OnInit {

    @Input()
    dbOnKey: number;



    constructor(private elementRef: ElementRef) {

    }

    private downSubject$ = new BehaviorSubject<boolean>(false);

    ngOnInit() {

        const keydown = combineLatest(fromEvent(this.elementRef.nativeElement, 'keydown'), this.downSubject$)
            .pipe(
                distinctUntilChanged(([xev, xdown]: [KeyboardEvent, boolean], [yev, ydown]: [KeyboardEvent, boolean]) => {
                    return `${xdown}|${xev.type}|${xev.code || xev.which}` === `${ydown}|${yev.type}|${yev.code || yev.which}`
                }),
                tap(e => console.log("KEYDOWN", e)),
                tap(_ => this.downSubject$.next(true))
            );

        const keyup = combineLatest(fromEvent(this.elementRef.nativeElement, 'keyup'), this.downSubject$)
            .pipe(
                distinctUntilChanged(([xev, xdown]: [KeyboardEvent, boolean], [yev, ydown]: [KeyboardEvent, boolean]) => {
                    return `${xdown}|${xev.type}|${xev.code || xev.which}` === `${ydown}|${yev.type}|${yev.code || yev.which}`
                }),
                tap(e => console.log("KEYUP", e)),
                tap(_ => this.downSubject$.next(false))
            );

        combineLatest(keydown, keyup).subscribe(([down, up]) => {
           console.log(down, up);
        })

        // keydown.subscribe(k => console.log(k))
        // keyup.subscribe()
    }


}
