import { Directive, ElementRef, Input, OnInit, Renderer2, OnDestroy } from '@angular/core';

@Directive({
    selector: '[dbStopPropagation]'
})
export class DoobStopPropagationDirective implements OnInit, OnDestroy {

    @Input()
    dbStopPropagation: string | Array<string>;

    private removeListenerArray: Array<(() => void)> = []

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {

    }

    ngOnInit() {
        let events: Array<string> = [];
        if (this.dbStopPropagation instanceof Array) {
            events = [...this.dbStopPropagation];
        } else {
            events = this.dbStopPropagation.split(",")
        }
        events.forEach(ev => {
            try {
                this.removeListenerArray.push(
                    this.renderer.listen(this.elementRef, ev, (event: Event) => {
                        try {
                            event.stopPropagation();
                        } catch (error) {
                            console.log(error);
                        }

                    })
                );
            } catch (error) {
                console.log(error);
            }
        });
    }

    ngOnDestroy() {
        this.removeListenerArray.forEach(rl => rl());
    }


}
