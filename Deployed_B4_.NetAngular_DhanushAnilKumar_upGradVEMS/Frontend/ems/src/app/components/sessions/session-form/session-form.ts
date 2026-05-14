import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { SessionService }
from '../../../services/session';

import { EventService }
from '../../../services/event';

import { SpeakerService }
from '../../../services/speaker';

import { EventModel }
from '../../../models/event.model';

import { Speaker }
from '../../../models/speaker.model';

import { CreateSession }
from '../../../models/create-session.model';

@Component({
  selector: 'app-session-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './session-form.html',
  styleUrl: './session-form.css'
})
export class SessionForm
implements OnInit {

  events: EventModel[] = [];

  speakers: Speaker[] = [];

  existingSessions: any[] = [];

  sessionId = '';

  isEditMode = false;

  model: CreateSession = {

    eventId: '',

    speakerId: '',

    title: '',

    sessionStart: new Date(),

    sessionEnd: new Date(),

    sessionUrl: '',

    description: ''
  };

  errorMessage = '';

  successMessage = '';

  constructor(

    private sessionService: SessionService,

    private eventService: EventService,

    private speakerService: SpeakerService,

    private route: ActivatedRoute,

    private router: Router,

    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.sessionId =
      this.route.snapshot.params['id'];

    this.loadExistingSessions();

    this.loadEvents();
  }

  loadExistingSessions() {

    this.sessionService
      .getAll()
      .subscribe({

        next: (response) => {

          this.existingSessions =
            response;
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  loadEvents() {

    this.eventService
      .getAll()
      .subscribe({

        next: (response) => {

          this.events = response;

          this.cdr.detectChanges();

          this.loadSpeakers();
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  loadSpeakers() {

    this.speakerService
      .getAll()
      .subscribe({

        next: (response) => {

          this.speakers = response;

          this.cdr.detectChanges();

          if (this.sessionId) {

            this.isEditMode = true;

            this.loadSession();
          }
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  loadSession() {

    this.sessionService
      .getById(this.sessionId)
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.model = {

            eventId:
              response.eventId,

            speakerId:
              response.speakerId,

            title:
              response.title,

            sessionStart:
              response.sessionStart,

            sessionEnd:
              response.sessionEnd,

            sessionUrl:
              response.sessionUrl,

            description:
              response.description
          };

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  saveSession() {

    // START DATE

    const start = new Date(
      this.model.sessionStart
    );

    // FIND SELECTED EVENT

    const selectedEvent =

    this.events.find(x =>

    x.eventId ===
    this.model.eventId
    );

   // EVENT DATE VALIDATION

   if (selectedEvent) {

   const eventDate =

    new Date(
      selectedEvent.eventDate
    );

   // REMOVE TIME

   eventDate.setHours(
    0, 0, 0, 0
   );

   const sessionDate =
    new Date(start);

   sessionDate.setHours(
    0, 0, 0, 0
   );

    // SESSION DATE MUST MATCH EVENT DATE

   if (
    sessionDate.getTime()

    !==

    eventDate.getTime()
    ) {

    this.errorMessage =

      'Session date must match event date';

    return;
     }
    }

    // END DATE

    const end = new Date(
      this.model.sessionEnd
    );

    // START > END

    if (start >= end) {

      this.errorMessage =

        'Session start time must be earlier than session end time';

      return;
    }

    // EVENT REQUIRED

    if (!this.model.eventId) {

      this.errorMessage =

        'Please select event';

      return;
    }

    // SPEAKER REQUIRED

    if (!this.model.speakerId) {

      this.errorMessage =

        'Please select speaker';

      return;
    }

    // TITLE REQUIRED

    if (!this.model.title) {

      this.errorMessage =

        'Session title is required';

      return;
    }

    // TITLE LENGTH

    if (
      this.model.title.length < 3
    ) {

      this.errorMessage =

        'Session title must contain at least 3 characters';

      return;
    }

    // URL REQUIRED

    if (!this.model.sessionUrl) {

      this.errorMessage =

        'Session URL is required';

      return;
    }

    // DUPLICATE SESSION

    const duplicate =

      this.existingSessions.find(x =>

        x.title
          .toLowerCase()

        ===

        this.model.title
          .toLowerCase()
      );

    if (
      duplicate &&
      !this.isEditMode
    ) {

      this.errorMessage =

        'Session title already exists';

      return;
    }

    // CLEAR ERROR

    this.errorMessage = '';

    console.log(this.model);

    // UPDATE

    if (this.isEditMode) {

      this.sessionService
        .update(
          this.sessionId,
          this.model
        )
        .subscribe({

          next: (response) => {

            console.log(response);

            this.showSuccess('Session updated successfully');

            setTimeout(() => {
            this.router.navigateByUrl(
              '/sessions'
            );}, 1500);
          },

          error: (error) => {

            console.log(error);

              this.showError('Failed to update session');
            
          }
        });
    }

    // CREATE

    else {

      this.sessionService
        .create(this.model)
        .subscribe({

          next: (response) => {

            console.log(response);

            this.showSuccess('Session created successfully');

            setTimeout(() => {
            this.router.navigateByUrl(
              '/sessions'
            );}, 1500);
            
          },

          error: (error) => {

            console.log(error);

            this.showError('Failed to create session');
            
          }
        });
    }
  }

  showSuccess(message: string) {

    this.errorMessage = '';

    this.successMessage = '';

    this.cdr.detectChanges();

    this.successMessage = message;

    this.cdr.detectChanges();

    setTimeout(() => {

      this.successMessage = '';

      this.cdr.detectChanges();

    }, 3000);
  }

  showError(message: string) {

    this.successMessage = '';

    this.errorMessage = '';

    this.cdr.detectChanges();

    this.errorMessage = message;

    this.cdr.detectChanges();

    setTimeout(() => {

      this.errorMessage = '';

      this.cdr.detectChanges();

    }, 3000);
    }
}