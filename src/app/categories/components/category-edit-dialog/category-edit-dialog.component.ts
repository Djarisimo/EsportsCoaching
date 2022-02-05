import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'lq-category-edit-dialog',
  templateUrl: './category-edit-dialog.component.html',
  styleUrls: ['./category-edit-dialog.component.scss']
})
export class CategoryEditDialogComponent implements OnInit {

  categorySaved = new EventEmitter<Category>();

  id: number;
  category: Category;

  formGroup: FormGroup;

  constructor(private categoriesService: CategoriesService,
              private toastrService: ToastrService,
              private bsModalRef: BsModalRef,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.id) {
      this.categoriesService.getById$(this.id).pipe(
        take(1)
      ).subscribe((response) => {
        this.category = response;
        this.buildForm(response);
      });
    } else {
      this.buildForm();
    }
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      return;
    }

    const body: Category = {
      ...this.category,
      ...this.formGroup.value
    };

    this.categoriesService.save$(body).pipe(
      take(1)
    ).subscribe((response) => {
      this.toastrService.success('Category was successfully saved.', 'Success');
      this.hideDialog();
      this.categorySaved.emit(response);
    });
  }

  hideDialog(): void {
    this.bsModalRef.hide();
  }

  private buildForm(category?: Category): void {
    if (!category) {
      category = new Category();
    }

    this.formGroup = this.fb.group({
      title: [category.title, [Validators.required, Validators.minLength(3)]]
    });
  }

}
