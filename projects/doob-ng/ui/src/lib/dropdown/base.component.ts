import { ViewContainerRef } from '@angular/core'


export abstract class DoobBaseComponent {

    abstract TypeName = ''
    abstract viewContainerRef: ViewContainerRef
}
