import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { AppStore } from '../../app.store';

export const networkCheckerInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AppStore)

  return next(req).pipe(
    catchError((error) => {
      if (!error.status) {
        store.showServerError()
      }
      throw error
    })
  );
};
