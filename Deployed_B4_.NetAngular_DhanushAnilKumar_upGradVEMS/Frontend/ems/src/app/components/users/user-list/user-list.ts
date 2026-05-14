import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { UserService }
from '../../../services/user';

import { User }
from '../../../models/user.model';

import { FormsModule }
from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList
implements OnInit {

  users: User[] = [];

  loading = true;

  filteredUsers: any[] = [];

  searchText = '';

  sortOrder = 'asc';

  currentPage = 1;

  pageSize = 5;

  paginatedUsers: any[] = [];

  totalPages = 0;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadUsers();
  }

  loadUsers() {

    this.loading = true;

    this.userService
      .getUsers()
      .subscribe({

        next: (response) => {

          console.log(response);

          this.users = response;

          this.filteredUsers = 
            [...this.users];

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

  this.filteredUsers =
    this.users.filter(x =>

      x.userName
        .toLowerCase()
        .includes(

          this.searchText
            .toLowerCase()
        )

      ||

      x.emailId
        .toLowerCase()
        .includes(

          this.searchText
            .toLowerCase()
        )
    );

  // SORT

  this.filteredUsers.sort(

    (a, b) =>

      this.sortOrder === 'asc'

        ? a.userName.localeCompare(
            b.userName
          )

        : b.userName.localeCompare(
            a.userName
          )
  );

  // PAGINATION

  this.totalPages =
    Math.ceil(

      this.filteredUsers.length
      / this.pageSize
    );

  const startIndex =

    (this.currentPage - 1)
    * this.pageSize;

  const endIndex =

    startIndex
    + this.pageSize;

  this.paginatedUsers =

    this.filteredUsers.slice(
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
}