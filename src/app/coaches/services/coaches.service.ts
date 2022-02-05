import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Coach } from '../models/coach.model';

@Injectable({
  providedIn: 'root'
})

export class CoachesService {

  constructor(private httpClient: HttpClient) {
  }

  getAll$(): Observable<Coach[]> {
    const url = environment.apiUrl + '/coaches';

    const httpParams = new HttpParams({
      fromObject: {
        _expand: 'category'
      }
    });

    return this.httpClient.get<Coach[]>(url, {
      params: httpParams
    });
  }

  getById$(id: number): Observable<Coach>{
    const url = `${environment.apiUrl}/coaches/${id}`;

    const httpParams = new HttpParams({
      fromObject: {
        _expand: 'category'
      }
    });

    return this.httpClient.get<Coach>(url, {
      params: httpParams
    });
  }

  save$(coach: Coach): Observable<Coach> {
    if(!coach.id) {
      return this.create$(coach);
    } else {
      return this.edit$(coach);
    }
  }

  create$(coach: Coach): Observable<Coach> {
    const url = environment.apiUrl + '/coaches';

    coach.created = new Date();
    coach.lastUpdated = new Date();

    return this.httpClient.post<Coach>(url, coach);
  }

  edit$(coach: Coach): Observable<Coach> {
    const url = `${environment.apiUrl}/coaches/${coach.id}`;

    coach.lastUpdated = new Date();

    return this.httpClient.put<Coach>(url, coach);
  }

  delete$(id: number): Observable<void> {
    const url = `${environment.apiUrl}/coaches/${id}`;

    return this.httpClient.delete<void>(url);
  }

}