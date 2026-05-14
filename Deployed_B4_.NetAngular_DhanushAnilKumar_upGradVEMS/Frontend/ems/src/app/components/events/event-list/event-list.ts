import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { RouterLink }
from '@angular/router';

import { EventService }
from '../../../services/event';

import { EventModel }
from '../../../models/event.model';

import { ParticipantService }
from '../../../services/participant';

import { FormsModule }
from '@angular/forms';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css'
})
export class EventList
implements OnInit {

  events: EventModel[] = [];

  loading = true;

  filteredEvents: EventModel[] = [];

  searchText = '';

  sortOrder = 'asc';

  currentPage = 1;

  pageSize = 10;

  paginatedEvents: EventModel[] = [];

  totalPages = 0;

  successMessage = '';

  errorMessage = '';

  constructor(
    private eventService: EventService,
    private participantService: ParticipantService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadEvents();
  }

  loadEvents() {

    this.loading = true;

    this.eventService
      .getAll()
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.events = response;

          this.filteredEvents = 
           [...this.events];

          this.applyFilters();

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.log(error);

          this.loading = false;
        }
      });
  }

  applyFilters() {

   // SEARCH

   this.filteredEvents =
    this.events.filter(x =>

      x.eventName
        .toLowerCase()
        .includes(

          this.searchText
            .toLowerCase()
        )
    );

   // SORT

    this.filteredEvents.sort(

     (a, b) =>

      this.sortOrder === 'asc'

        ? a.eventName.localeCompare(
            b.eventName
          )

        : b.eventName.localeCompare(
            a.eventName
          )
    );

   // PAGINATION

   this.totalPages =
    Math.ceil(

      this.filteredEvents.length
      / this.pageSize
    );

   const startIndex =

    (this.currentPage - 1)
    * this.pageSize;

   const endIndex =

    startIndex
    + this.pageSize;

   this.paginatedEvents =

    this.filteredEvents.slice(
      startIndex,
      endIndex
    );
 }

  onSearch() {

   this.currentPage = 1; 
   this.applyFilters();

  }

  onSortChange() {

   this.currentPage = 1;
   this.applyFilters();

  }

  nextPage() {

   if (
    this.currentPage <
    this.totalPages
    ) {

    this.currentPage++;

    this.applyFilters();
    }
  }

  previousPage() {

    if (
     this.currentPage > 1
    ) {

    this.currentPage--;

    this.applyFilters();
   }
  }

  goToPage(page: number) {

   this.currentPage = page;

   this.applyFilters();
 }

 get pages(): number[] {

   return Array(
    this.totalPages
   )

   .fill(0)

   .map((x, i) => i + 1);
  }

  deleteEvent(id: string) {

    const confirmDelete =
      confirm('Delete this event?');

    if (!confirmDelete) {
      return;
    }

    this.eventService
      .delete(id)
      .subscribe({

        next: () => {

          this.showSuccess(
            'Event deleted successfully'
          );

          this.loadEvents();
        },

        error: (error) => {

          console.log(error);

          const message =
          error.error?.message ||
          error.error ||
          '';
        if(message
             .toLowerCase()
             .includes('existing')
          ||
          message
              .toLowerCase()
              .includes('sessions')   
        ) {
          this.showError(
            'Cannot delete event because participant or sessions are linked'
          );
        } else {
          this.showError(
            'Failed to delete event'
          );
        }
          
          
        }
      });
  }

  register(eventId: string) {

    this.participantService
    .register(eventId)
    .subscribe({

      next: (response) => {

        console.log(response);

        this.showSuccess('Registered successfully');
      },

      error: (error) => {

        console.log(error);
        
        const message =
          error.error?.message ||
          error.error ||
          '';
        if(message
              .toLowerCase()
              .includes('already')   
        ) {
          this.showError(
            'You are already registered for this event'
          );
        } else {
          this.showError(
            'Failed to register'
          );
        }
      }
    });
  }

  unregister(eventId: string) {

   this.participantService
    .unregister(eventId)
    .subscribe({

      next: (response) => {

        console.log(response);

        this.showSuccess(
          'Unregistered successfully'
        );
        
      },

      error: (error) => {

        console.log(error);

        this.showError(
          'Failed to unregister'
         );        
      }
    });
  }

  markAttendance(eventId: string) {

  this.participantService
    .markAttendance(eventId)
    .subscribe({

      next: (response) => {

        console.log(response);

        this.showSuccess(
          'Attendance marked successfully'
        );

      },

      error: (error) => {

        console.log(error);

        this.showError(
          'Failed to mark attendance'
        );

      }
    });
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

  get role(): string {

    return sessionStorage.getItem(
      'role'
       ) || '';
  }

}