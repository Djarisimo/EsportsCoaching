import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Coach } from '../../models/coach.model';
import { CoachesService } from '../../services/coaches.service';

@Component({
  selector: 'lq-coaches-list',
  templateUrl: './coaches-list.component.html',
  styleUrls: ['./coaches-list.component.scss']
})
export class CoachesListComponent implements OnInit {

  coaches: Coach[];

  selectedCoach: Coach;
  modalRef: BsModalRef;

  listType = 'table';

  constructor(private coachesService: CoachesService,
              private bsModalService: BsModalService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  openDeleteDialog(template: TemplateRef<any>, coach: Coach): void {
    this.selectedCoach = coach;
    this.modalRef = this.bsModalService.show(template);
  }

  deleteCoach(): void {
    this.coachesService.delete$(this.selectedCoach.id).pipe(
      take(1)
    ).subscribe(() => {
      this.getAll();
      this.toastrService.success('Coach was successfully deleted.', 'Success');
      this.modalRef.hide();
    }, (response: HttpErrorResponse) => {
      this.toastrService.error(response.message, 'Error', {
        disableTimeOut: true,
        closeButton: true
      });
    })
  }

  private getAll(): void {
    this.coachesService.getAll$().pipe(
      take(1)
    ).subscribe((response) => {
      this.coaches = response;
    });
  }

}
