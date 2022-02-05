import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryEditDialogComponent } from './components/category-edit-dialog/category-edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CategoryDeleteDialogComponent } from './components/category-delete-dialog/category-delete-dialog.component';


@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoryEditDialogComponent,
    CategoryDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ModalModule.forChild(),
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
