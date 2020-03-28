import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckboxDemoComponent } from './components/checkbox/checkbox-demo.component';
import { AccordionDemoComponent } from './components/accordion/accordion-demo.component';
import { DropdownDemoComponent } from './components/dropdown/dropdown-demo.component';
import { EditorDemoComponent } from './components/editor/editor-demo.component';


const routes: Routes = [
    {
        path: 'accordion',
        component: AccordionDemoComponent
    },
    {
        path: 'checkbox',
        component: CheckboxDemoComponent
    },
    {
        path: 'dropdown',
        component: DropdownDemoComponent
    },
    {
        path: 'editor',
        component: EditorDemoComponent
    }
];

export const RouteComponents = [
    CheckboxDemoComponent,
    AccordionDemoComponent,
    DropdownDemoComponent,
    EditorDemoComponent
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
