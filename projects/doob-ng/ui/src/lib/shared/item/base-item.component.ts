import { ViewContainerRef, Type, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'


export abstract class DoobBaseItemComponent implements OnDestroy {

    abstract TypeName = ''
    abstract viewContainerRef: ViewContainerRef
    abstract ParentComponent: string;

    ngOnDestroy() {

    }

}
