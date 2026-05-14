import { Component } from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService }
from '../../services/auth';

import { Login as LoginModel }
from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  model: LoginModel = {

    emailId: '',
    password: ''
  };

  errorMessage = '';

  successMessage = '';

  constructor(

    private authService: AuthService,

    private router: Router

  ) { }

  onLogin() {

    this.errorMessage = '';

    this.authService
      .login(this.model)
      .subscribe({

        next: (response) => {

          console.log(response);

          // SAVE TOKEN

          this.authService
            .saveToken(response.token);

          // SAVE USER

          sessionStorage.setItem(
            'user',
            JSON.stringify(response.user)
          );

          // SAVE EMAIL

          sessionStorage.setItem(
            'email',
            response.user.emailId
          );

          // SAVE ROLE

          sessionStorage.setItem(
            'role',
            response.user.role
          );

          const role =
            response.user.role;

          // ADMIN

          if (role === 'Admin') {

            this.router.navigateByUrl(
              '/admin-dashboard'
            );
          }

          // PARTICIPANT

          else {

            this.router.navigateByUrl(
              '/participant-dashboard'
            );
          }
        },

        error: (error) => {

          console.log(error);

          this.errorMessage =

            error.error.message

            ||

            'Login failed';
        }
      });
  }
}