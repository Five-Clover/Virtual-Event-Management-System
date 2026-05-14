import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { RouterLink }
from '@angular/router';

import { SpeakerService }
from '../../../services/speaker';

import { Speaker }
from '../../../models/speaker.model';

import { FormsModule }
from '@angular/forms';

@Component({
  selector: 'app-speaker-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './speaker-list.html',
  styleUrl: './speaker-list.css'
})
export class SpeakerList
implements OnInit {

  speakers: Speaker[] = [];

  loading = true;

  filteredSpeakers: any[] = [];

  searchText = '';

  sortOrder = 'asc';

  currentPage = 1;

  pageSize = 5;

  paginatedSpeakers: any[] = [];

  totalPages = 0;

  successMessage = '';
  
  errorMessage = '';

  constructor(
    private speakerService: SpeakerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadSpeakers();
  }

  loadSpeakers() {

    this.loading = true;

    this.speakerService
      .getAll()
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.speakers = response;

          this.filteredSpeakers =
             [...this.speakers];

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

  this.filteredSpeakers =
    this.speakers.filter(x =>

      x.speakerName
        .toLowerCase()
        .includes(

          this.searchText
            .toLowerCase()
        )
    );

  // SORT

  this.filteredSpeakers.sort(

    (a, b) =>

      this.sortOrder === 'asc'

        ? a.speakerName.localeCompare(
            b.speakerName
          )

        : b.speakerName.localeCompare(
            a.speakerName
          )
  );

  // PAGINATION

  this.totalPages =
    Math.ceil(

      this.filteredSpeakers.length
      / this.pageSize
    );

  const startIndex =

    (this.currentPage - 1)
    * this.pageSize;

  const endIndex =

    startIndex
    + this.pageSize;

  this.paginatedSpeakers =

    this.filteredSpeakers.slice(
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

  onSearch(){
    this.currentPage = 1;
    this.applyFilters();
  }

  onSortChange(){
    this.currentPage = 1;
    this.applyFilters();
  }

  deleteSpeaker(id: string) {

    const confirmDelete =
      confirm('Delete this speaker?');

    if (!confirmDelete) {
      return;
    }

    this.speakerService
      .delete(id)
      .subscribe({

        next: () => {

          this.showSuccess('Speaker deleted successfully');

          this.loadSpeakers();
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
            'Cannot delete speaker because sessions are linked'
          );
        } else {
          this.showError(
            'Failed to delete speaker'
          );
        }

          
          
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