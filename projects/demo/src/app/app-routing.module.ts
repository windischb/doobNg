import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckboxDemoComponent } from './components/checkbox/checkbox-demo.component';
import { AccordionDemoComponent } from './components/accordion/accordion-demo.component';
import { DropdownDemoComponent } from './components/dropdown/dropdown-demo.component';
import { EditorDemoComponent } from './components/editor/editor-demo.component';
import { TabsDemoComponent } from './components/tabs/tabs-demo.component';
import { MenuDemoComponent } from './components/menu/menu-demo.component';
import { ToastDemoComponent } from './components/toast/toast-demo.component';
import { GridDemoComponent } from './components/grid/grid-demo.component';


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
    },
    {
        path: 'grid',
        component: GridDemoComponent
    },
    {
        path: 'menu',
        component: MenuDemoComponent
    },
    {
        path: 'tabs',
        component: TabsDemoComponent
    },
    {
        path: 'toast',
        component: ToastDemoComponent
    }
];

export const RouteComponents = [
    CheckboxDemoComponent,
    AccordionDemoComponent,
    DropdownDemoComponent,
    EditorDemoComponent,
    MenuDemoComponent,
    TabsDemoComponent,
    ToastDemoComponent,
    GridDemoComponent
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
