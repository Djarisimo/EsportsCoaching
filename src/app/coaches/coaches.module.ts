import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CoachesRoutingModule } from "./coaches-routing.module";
import { CoachesListComponent } from "./components/coaches-list/coaches-list.component";
import { CoachDetailsComponent } from './components/coach-details/coach-details.component';
import { CoachCreateComponent } from "./components/coach-create/coach-create.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        BsDatepickerModule,
        ButtonsModule.forRoot(),
        ModalModule.forChild(),
        SharedModule,
        CoachesRoutingModule
    ],
    declarations: [
        CoachesListComponent,
        CoachDetailsComponent,
        CoachCreateComponent
    ],
    exports: [
        CoachesListComponent
    ]
})
export class CoachesModule {

}