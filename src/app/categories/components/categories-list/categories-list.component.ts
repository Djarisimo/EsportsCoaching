import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { CategoryDeleteDialogComponent } from '../category-delete-dialog/category-delete-dialog.component';
import { CategoryEditDialogComponent } from '../category-edit-dialog/category-edit-dialog.component';

@Component({
  selector: 'lq-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[];

  constructor(private categoriesService: CategoriesService,
              private bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.getAll();
  }

  onCreateClick(): void {
    this.onEditClick();
  }

  onEditClick(id?: number): void {
    const ref = this.bsModalService.show(CategoryEditDialogComponent, {
      initialState: {
        id: id
      }
    });
    
    ref.content.categorySaved.pipe(
      take(1)
    ).subscribe(() => {
      this.getAll();
    });
  }

  onDeleteClick(category: Category): void {
    const ref = this.bsModalService.show(CategoryDeleteDialogComponent, {
      initialState: {
        category: category
      }
    });

    ref.content.categoryDeleted.pipe(
      take(1)
    ).subscribe(() => {
      this.getAll();
    });
  }

  private getAll(): void {
    this.categoriesService.getAll$().pipe(
      take(1)
    ).subscribe((response) => {
      this.categories = response;
    });
  }

}
