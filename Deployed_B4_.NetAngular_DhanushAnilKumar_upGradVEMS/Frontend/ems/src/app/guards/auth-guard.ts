import {
  CanActivateFn,
  Router
} from '@angular/router';

import { inject }
from '@angular/core';

export const authGuard:
CanActivateFn = (route) => {

  const router =
    inject(Router);

  const token =
    sessionStorage.getItem(
      'token'
    );

  const role =
    sessionStorage.getItem(
      'role'
    );

  // NOT LOGGED IN

  if (!token) {

    router.navigate([
      '/login'
    ]);

    return false;
  }

  // ROLE CHECK

  const expectedRole =
    route.data?.['role'];

  if (
    expectedRole &&
    role !== expectedRole
  ) {

    // ADMIN TRYING
    // PARTICIPANT PAGE

    if (role === 'Admin') {

      router.navigate([
        '/admin-dashboard'
      ]);
    }

    // PARTICIPANT TRYING
    // ADMIN PAGE

    else {

      router.navigate([
        '/participant-dashboard'
      ]);
    }

    return false;
  }

  return true;
};