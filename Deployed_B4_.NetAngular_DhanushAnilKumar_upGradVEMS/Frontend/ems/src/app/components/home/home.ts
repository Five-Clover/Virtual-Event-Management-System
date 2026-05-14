import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import { FormsModule }
from '@angular/forms';

import { EventService }
from '../../services/event';

import { EventModel }
from '../../models/event.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home
implements OnInit {

  // ALL EVENTS

  events: EventModel[] = [];

  // FILTERED EVENTS

  filteredEvents:
    EventModel[] = [];

  // SEARCH

  searchText = '';

  // LOADING

  loading = true;

  constructor(

    private eventService:
      EventService,

    private router:
      Router,

    private cdr:
      ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    // SMALL DELAY
    // PREVENTS INITIAL
    // LOADING ISSUE

    setTimeout(() => {

      this.loadEvents();

    }, 300);
  }

  loadEvents() {

    console.log(
      'loadEvents called'
    );

    this.loading = true;

    this.eventService
      .getAll()
      .subscribe({

        next: (
          response: any
        ) => {

          console.log(
            response
          );

          this.events =

            response.items
            || response;

          // INITIAL FILTER

          this.filteredEvents =

            [...this.events];

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.log(error);

          this.loading = false;

          this.cdr.detectChanges();
        },

        complete: () => {

          this.loading = false;

          this.cdr.detectChanges();
        }
      });
  }

  // SEARCH EVENTS

  onSearch() {

    const text =

      this.searchText
        .toLowerCase();

    this.filteredEvents =

      this.events.filter(event =>

        event.eventName
          ?.toLowerCase()
          .includes(text)

        ||

        event.categoryName
          ?.toLowerCase()
          .includes(text)

        ||

        event.description
          ?.toLowerCase()
          .includes(text)
      );

    this.cdr.detectChanges();
  }

  // REGISTER EVENT

  registerForEvent() {

    const token =

      sessionStorage.getItem(
        'token'
      );

    // NOT LOGGED IN

    if (!token) {

      this.router
        .navigateByUrl(
          '/login'
        );

      return;
    }

    // LOGGED IN

    this.router
      .navigateByUrl(
        '/events'
      );
  }

  // CHECK LOGIN

  get isLoggedIn(): boolean {

    return !!sessionStorage
      .getItem('token');
  }

  // GET ROLE

  get role(): string {

    return sessionStorage
      .getItem('role')
      || '';
  }
}