import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { ObjectHelper } from '../helpers/object.helper';

export const normalizerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event) => {
      if (event instanceof HttpResponse) {
        const body = ObjectHelper.keysToCamelCase(event.body)
        return event.clone({ body: body })
      }
      return event
    })
  );
};
