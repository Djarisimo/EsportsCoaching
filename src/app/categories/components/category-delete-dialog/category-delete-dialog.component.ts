import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'lq-category-delete-dialog',
  templateUrl: './category-delete-dialog.component.html',
  styleUrls: ['./category-delete-dialog.component.scss']
})
export class CategoryDeleteDialogComponent implements OnInit {

  categoryDeleted = new EventEmitter<void>();

  category: Category;

  constructor(private categoriesService: CategoriesService,
              private toastrService: ToastrService,
              private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  deleteCategory(): void {
    this.categoriesService.delete$(this.category.id).pipe(
      take(1)
    ).subscribe(() => {
      this.toastrService.success('Category was successfully deleted.', 'Success');
      this.hideDialog();
      this.categoryDeleted.emit();
    });
  }

  hideDialog(): void {
    this.bsModalRef.hide();
  }

}
