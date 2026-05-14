import { Component }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(
    private router: Router
  ) { }

  get isLoggedIn(): boolean {

    return !!sessionStorage.getItem(
      'token'
    );
  }

  get role(): string {

    return sessionStorage.getItem(
      'role'
    ) || '';
  }

  get dashboardRoute(): string {

    return this.role === 'Admin'
      ? '/admin-dashboard'
      : '/participant-dashboard';
 }

  logout() {

    sessionStorage.clear();

    this.router.navigate([
      '/login'
    ]);
  }
}