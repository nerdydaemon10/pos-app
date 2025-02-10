import _ from 'lodash'
import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from './auth.store';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore)

  let clone = req

  if (!_.isEmpty(store.accessToken())) {
    clone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${store.accessToken()}`
      }
    })
  }

  return next(clone).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == HttpStatusCode.Unauthorized && !_.isEmpty(store.refreshToken())) {
        return store.refresh().pipe(
          switchMap((_) => 
            {
              return next(req.clone({
                setHeaders: {
                  Authorization: `Bearer ${store.accessToken()}`
                }
              }))
            }
          ),
          catchError((error: HttpErrorResponse) => {
            store.logout()
            return throwError(() => error)
          })
        )
      }
      return throwError(() => error)
    })
  );
};