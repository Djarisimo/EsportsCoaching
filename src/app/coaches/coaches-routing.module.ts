import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoachCreateComponent } from "./components/coach-create/coach-create.component";
import { CoachDetailsComponent } from "./components/coach-details/coach-details.component";
import { CoachesListComponent } from "./components/coaches-list/coaches-list.component";


const routes: Routes = [
    {
        path: 'list',
        component: CoachesListComponent
    },
    {
        path: 'details/:id',
        component: CoachDetailsComponent
    },
    {
        path: 'create',
        component: CoachCreateComponent
    },
    {
        path: 'edit/:id',
        component: CoachCreateComponent
    },
    {
        path: '',
        redirectTo: 'list'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CoachesRoutingModule {

}