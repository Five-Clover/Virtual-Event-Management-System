import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { RouterLink }
from '@angular/router';

import { ParticipantService }
from '../../../services/participant';

import { EventService }
from '../../../services/event';

@Component({
  selector: 'app-participant-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl:
    './participant-dashboard.html',

  styleUrl:
    './participant-dashboard.css'
})
export class ParticipantDashboard
implements OnInit {

  totalRegisteredSessions = 0;

  upcomingSessions = 0;

  pastSessions = 0;

  availableEvents = 0;

  loading = true;

  email = '';

  constructor(

    private participantService:
      ParticipantService,

    private eventService:
      EventService,

    private cdr:
      ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.email =
      sessionStorage.getItem(
        'email'
      ) || '';

    this.loadStatistics();
  }

  loadStatistics() {

    this.loading = true;

    // MY SESSIONS

    this.participantService
      .getMySessions(this.email)
      .subscribe({

        next: (response: any[]) => {

          console.log(
            'my sessions',
            response
          );

          this.totalRegisteredSessions =
            response.length;

          // UPCOMING

          const now =
            new Date();

          this.upcomingSessions =
            response.filter(x =>
              new Date(
                x.sessionStart
              ) > now
            ).length;

          // ATTENDED

          this.pastSessions =
            response.filter(x =>
              new Date(
                x.sessionEnd
              ) < now
            ).length;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.log(error);
        }
      });

    // EVENTS

    this.eventService
      .getAll()
      .subscribe({

        next: (response: any[]) => {

          console.log(
            'events',
            response
          );

          this.availableEvents =
            response.length;

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.log(error);

          this.loading = false;

          this.cdr.detectChanges();
        }
      });
  }
}