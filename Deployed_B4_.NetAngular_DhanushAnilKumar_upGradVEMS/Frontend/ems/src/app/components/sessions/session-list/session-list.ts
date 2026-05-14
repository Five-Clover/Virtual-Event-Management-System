import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { RouterLink }
from '@angular/router';

import { SessionService }
from '../../../services/session';

import { Session }
from '../../../models/session.model';

import { FormsModule }
from '@angular/forms';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './session-list.html',
  styleUrl: './session-list.css'
})
export class SessionList
implements OnInit {

  sessions: Session[] = [];

  loading = true;

  filteredSessions: any[] = [];
  
    searchText = '';
  
    sortOrder = 'asc';

    currentPage = 1;
    
    pageSize = 10;
    
    paginatedSessions: any[] = [];
    
    totalPages = 0;

    successMessage = '';
    
    errorMessage = '';

  constructor(
    private sessionService: SessionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadSessions();
  }

  loadSessions() {

    this.loading = true;

    this.sessionService
      .getAll()
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.sessions = response;

          this.filteredSessions = 
           [...this.sessions];

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

   this.filteredSessions =
    this.sessions.filter(x =>

      x.title
        .toLowerCase()
        .includes(

          this.searchText
            .toLowerCase()
        )
    );

    // SORT

    this.filteredSessions.sort(

     (a, b) =>

      this.sortOrder === 'asc'

        ? a.title.localeCompare(
            b.title
          )

        : b.title.localeCompare(
            a.title
          )
    );

   // PAGINATION

   this.totalPages =
    Math.ceil(

      this.filteredSessions.length
      / this.pageSize
    );

   const startIndex =

    (this.currentPage - 1)
    * this.pageSize;

   const endIndex =

    startIndex
    + this.pageSize;

    this.paginatedSessions =

    this.filteredSessions.slice(
      startIndex,
      endIndex
    );
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

  onSearch() {

    this.currentPage = 1;
    this.applyFilters();

  }

  onSortChange() {

   this.currentPage = 1; 
   this.applyFilters();
   
  }

  deleteSession(id: string) {

    const confirmDelete =
      confirm('Delete this session?');

    if (!confirmDelete) {
      return;
    }

    this.sessionService
      .delete(id)
      .subscribe({

        next: () => {

          this.showSuccess (
            'Session deleted successfully');          

          this.loadSessions();
        },

        error: (error) => {

          console.log(error);

            this.showError(
              'Failed to delete session'
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
}