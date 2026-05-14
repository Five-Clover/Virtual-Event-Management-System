import { Injectable }
from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import { Observable }
from 'rxjs';

import { environment }
from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private apiUrl =
    `${environment.apiUrl}/Participant`;

  constructor(
    private http: HttpClient
  ) { }

  register(
    eventId: string
  ): Observable<any> {

    const params =
      new HttpParams()
        .set('eventId', eventId);

    return this.http.post(
      `${this.apiUrl}/register`,
      {},
      {
        params,
        responseType: 'text'
      }
    );
  }

  unregister(
    eventId: string
  ): Observable<any> {

    const params =
      new HttpParams()
        .set('eventId', eventId);

    return this.http.delete(
      `${this.apiUrl}/unregister`,
      {
        params,
        responseType: 'text'
      }
    );
  }

  getMySessions(
    email: string
  ): Observable<any[]> {

    const params =
      new HttpParams()
        .set('email', email);

    return this.http.get<any[]>(
      `${this.apiUrl}/sessions`,
      {
        params
      }
    );
  }

  markAttendance(
    eventId: string
  ): Observable<any> {

    const params =
      new HttpParams()
        .set('eventId', eventId);

    return this.http.post(
      `${this.apiUrl}/mark-attendance`,
      {},
      {
        params,
        responseType: 'text'
      }
    );
  }
}