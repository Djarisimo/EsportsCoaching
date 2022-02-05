import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';


@Injectable({
    providedIn: 'root'
}) 
export class CategoriesService {
    constructor(private httpClient: HttpClient) {
    }

    getAll$(): Observable<Category[]> {
        const url = environment.apiUrl + '/categories';

        return this.httpClient.get<Category[]>(url);
    }

    getById$(id: number): Observable<Category> {
        const url = `${environment.apiUrl}/categories/${id}`;

        return this.httpClient.get<Category>(url);
    }

    save$(category: Category): Observable<Category> {
        if(!category.id) {
          return this.create$(category);
        } else {
          return this.edit$(category);
        }
      }

    create$(category: Category): Observable<Category> {
        const url = environment.apiUrl + '/categories';

        category.created = new Date();
        category.lastUpdated = new Date();
    
        return this.httpClient.post<Category>(url, category);
    }

    edit$(category: Category): Observable<Category> {
        const url = `${environment.apiUrl}/categories/${category.id}`;

        category.lastUpdated = new Date();

        return this.httpClient.put<Category>(url, category);
    }

    delete$(id: number): Observable<void> {
        const url = `${environment.apiUrl}/categories/${id}`;
    
        return this.httpClient.delete<void>(url);
      }
}