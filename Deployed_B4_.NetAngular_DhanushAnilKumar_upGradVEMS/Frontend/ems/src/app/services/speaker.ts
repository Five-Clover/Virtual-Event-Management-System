import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment }
from '../../environments/environment';

import { Speaker }
from '../models/speaker.model';

import { CreateSpeaker }
from '../models/create-speaker.model';

import { UpdateSpeaker }
from '../models/update-speaker.model';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  private apiUrl =
    `${environment.apiUrl}/Speaker`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Speaker[]> {

    return this.http.get<Speaker[]>(
      this.apiUrl
    );
  }

  getById(id: string): Observable<Speaker> {

    return this.http.get<Speaker>(
      `${this.apiUrl}/${id}`
    );
  }

  create(
    data: CreateSpeaker
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
    data: UpdateSpeaker
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