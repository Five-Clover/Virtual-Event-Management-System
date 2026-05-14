import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const user = sessionStorage.getItem('user');

  if (!user) {

    router.navigate(['/login']);

    return false;
  }

  const parsedUser = JSON.parse(user);

  if (parsedUser.role === 'Admin') {
    return true;
  }

  router.navigate(['/participant-dashboard']);

  return false;
};