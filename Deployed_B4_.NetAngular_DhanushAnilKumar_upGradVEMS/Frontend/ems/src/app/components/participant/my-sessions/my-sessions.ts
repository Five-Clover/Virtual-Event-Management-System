import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { ParticipantService }
from '../../../services/participant';

import { MySession }
from '../../../models/my-session.model';

import { FormsModule }
from '@angular/forms';

@Component({
  selector: 'app-my-sessions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './my-sessions.html',
  styleUrl: './my-sessions.css'
})
export class MySessions
implements OnInit {

  sessions: MySession[] = [];

  loading = true;

  filteredSessions: any[] = [];

  searchText = '';

  sortOrder = 'asc';

  currentPage = 1;

  pageSize = 5;

  paginatedSessions: any[] = [];

  totalPages = 0;

  email = '';

  constructor(
    private participantService: ParticipantService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.email =
      sessionStorage.getItem('email')
      || '';

    this.loadSessions();
  }

  loadSessions() {

    this.loading = true;

    this.participantService
      .getMySessions(this.email)
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
}