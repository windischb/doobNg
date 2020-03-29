import { ViewContainerRef, Type, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'


export abstract class DoobBaseItemComponent implements OnDestroy {

    abstract TypeName = ''
    abstract viewContainerRef: ViewContainerRef

    ParentComponentType$ = new Subject<Type<any>>();

    set ParentComponentType(value: Type<any>) {
        this.ParentComponentType$.next(value);
    }

    destroy$ = new Subject()
    ngOnDestroy() {
        this.destroy$.next()
    }

}
