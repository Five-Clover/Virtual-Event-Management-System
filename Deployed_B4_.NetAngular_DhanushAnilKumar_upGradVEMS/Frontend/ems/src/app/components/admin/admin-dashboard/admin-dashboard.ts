import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { RouterLink }
from '@angular/router';

import { forkJoin }
from 'rxjs';

import { EventService }
from '../../../services/event';

import { SessionService }
from '../../../services/session';

import { SpeakerService }
from '../../../services/speaker';

import { AuthService }
from '../../../services/auth';

import { ChangeDetectorRef }
from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard
implements OnInit {

  totalEvents = 0;

  totalSessions = 0;

  totalSpeakers = 0;

  totalUsers = 0;

  loading = true;

  constructor(

    private eventService: EventService,

    private sessionService: SessionService,

    private speakerService: SpeakerService,

    private authService: AuthService,

    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.loadStatistics();
  }

  loadStatistics() {

  this.loading = true;

  // EVENTS

  this.eventService
    .getAll()
    .subscribe({

      next: (response: any) => {

        console.log(
          'events',
          response
        );

        this.totalEvents =
          response.length;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log(
          'events error',
          error
        );
      }
    });

  // SESSIONS

  this.sessionService
    .getAll()
    .subscribe({

      next: (response: any) => {

        console.log(
          'sessions',
          response
        );

        this.totalSessions =
          response.length;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log(
          'sessions error',
          error
        );
      }
    });

  // SPEAKERS

  this.speakerService
    .getAll()
    .subscribe({

      next: (response: any) => {

        console.log(
          'speakers',
          response
        );

        this.totalSpeakers =
          response.length;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log(
          'speakers error',
          error
        );
      }
    });

  // USERS

  this.authService
    .getUsers()
    .subscribe({

      next: (response: any) => {

        console.log(
          'users',
          response
        );

        this.totalUsers =
          response.length;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log(
          'users error',
          error
        );

        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }
}