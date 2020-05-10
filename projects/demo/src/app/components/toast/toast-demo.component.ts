import { Component, ChangeDetectionStrategy } from "@angular/core";
import { DoobToastService } from '@local/ui';

@Component({
    templateUrl: './toast-demo.component.html',
    styleUrls: ['./toast-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastDemoComponent {


    constructor(private toast: DoobToastService) {

    }



    openDefault() {

        this.toast.AddError({title: "Error", message: "Alles ok!"});
    }
}
