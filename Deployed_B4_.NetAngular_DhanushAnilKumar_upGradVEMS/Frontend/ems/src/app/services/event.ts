import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment }
from '../../environments/environment';

import { EventModel }
from '../models/event.model';

import { CreateEvent }
from '../models/create-event.model';

import { UpdateEvent }
from '../models/update-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl =
    `${environment.apiUrl}/Event`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(
    pageNumber = 1,
    pageSize = 10
  ): Observable<EventModel[]> {

    return this.http.get<EventModel[]>(
      `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getById(id: string): Observable<EventModel> {

    return this.http.get<EventModel>(
      `${this.apiUrl}/${id}`
    );
  }

  create(data: CreateEvent): Observable<any> {

    return this.http.post(
      this.apiUrl,
      data,
      {
        responseType: 'text'
      }
    );
  }

  update(
    id: string,
    data: UpdateEvent
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      data,
      {
        responseType: 'text'
      }
    );
  }

  delete(id: string): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        responseType: 'text'
      }
    );
  }
}