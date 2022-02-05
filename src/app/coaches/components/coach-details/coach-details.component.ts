import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Coach } from '../../models/coach.model';
import { CoachesService } from '../../services/coaches.service';

@Component({
  selector: 'lq-coach-details',
  templateUrl: './coach-details.component.html',
  styleUrls: ['./coach-details.component.scss']
})
export class CoachDetailsComponent implements OnInit {

  id: number;
  coach: Coach;

  constructor(private coachesService: CoachesService,
              private route: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService) {
    this.id = +this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.coachesService.getById$(this.id).pipe(
      take(1)
    ).subscribe((coach) => {
      this.coach = coach;
    }, (response: HttpErrorResponse) => {
      this.toastrService.error(response.message, 'Error');
      this.router.navigate(['courses']);
    });
  }

  getCurrentPrice(): number {
    const regularPrice = this.coach.price;
    const discount = this.coach.discount; // percent

    return (regularPrice * (100 - discount)) / 100;
  }


}
