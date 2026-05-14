import {
  HttpInterceptorFn
} from '@angular/common/http';

export const authInterceptor:
HttpInterceptorFn = (

  req,
  next

) => {

  const token =
    sessionStorage.getItem(
      'token'
    );

  // NO TOKEN

  if (!token) {

    return next(req);
  }

  // TOKEN EXISTS

  const clonedRequest =
    req.clone({

      setHeaders: {

        Authorization:
          `Bearer ${token}`
      }
    });

  return next(clonedRequest);
};