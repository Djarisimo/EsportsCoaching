import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Category } from 'src/app/categories/models/category.model';
import { CategoriesService } from 'src/app/categories/services/categories.service';
import { Coach } from '../../models/coach.model';
import { CoachesService } from '../../services/coaches.service';


@Component({
  selector: 'lq-coach-create',
  templateUrl: './coach-create.component.html',
  styleUrls: ['./coach-create.component.scss']
})
export class CoachCreateComponent implements OnInit {

  id: number;
  coach: Coach;

  categories: Category[];

  formGroup: FormGroup;

  constructor(private coachesService: CoachesService,
              private categoriesService: CategoriesService,
              private toastrService: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id) {
      this.coachesService.getById$(this.id).pipe(
        take(1)
      ).subscribe((response) => {
        this.coach = response;
        this.buildForm(response);
      })
    } else {
      this.buildForm();
    }

    this.categoriesService.getAll$().pipe(
      take(1)
    ).subscribe((response) => {
      this.categories = response;
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      return;
    }

    const body: Coach = {
      ...this.coach,
      ...this.formGroup.value
    }

    delete body.category;

    this.coachesService.save$(body).pipe(
      take(1)
    ).subscribe(() => {
      this.toastrService.success('Coach was successfully saved.', 'Success');
      this.router.navigate(['coaches']);
    });
  }

  private buildForm(coach?: Coach): void {
    if (!coach) {
      coach = new Coach();
    }

    let availability;
    if(coach.availability) {
      availability = new Date(coach.availability);
    } else {
      availability = new Date();
    }

    this.formGroup = this.fb.group({
      name: [coach.name, [Validators.required, Validators.minLength(3)]],
      nickname: [coach.nickname, [Validators.required, Validators.minLength(3)]],
      description: [coach.description, [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
      achievments: [coach.achievments, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      categoryId: [coach.categoryId, Validators.required],
      language: [coach.language, Validators.required],
      price: [coach.price, [Validators.required, Validators.min(0)]],
      discount: [coach.discount, [Validators.min(0), Validators.max(100)]],
      posterImgUrl: [coach.posterImgUrl, Validators.required],
      isCoachCertified: coach.isCoachCertified,
      availability: [availability, Validators.required]
    });
  }
}
