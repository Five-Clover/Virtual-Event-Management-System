import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment }
from '../../environments/environment';

import { Session }
from '../models/session.model';

import { CreateSession }
from '../models/create-session.model';

import { UpdateSession }
from '../models/update-session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private apiUrl =
    `${environment.apiUrl}/Session`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Session[]> {

    return this.http.get<Session[]>(
      this.apiUrl
    );
  }

  getById(id: string): Observable<Session> {

    return this.http.get<Session>(
      `${this.apiUrl}/${id}`
    );
  }

  create(
    data: CreateSession
  ): Observable<any> {

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
    data: UpdateSession
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