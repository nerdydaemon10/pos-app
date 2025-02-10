import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG} from "primeng/config"

import { routes } from './app.routes';
import { theme } from './app.theme';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { networkCheckerInterceptor } from './core/interceptors/network-checker.interceptor';
import { MessageService } from 'primeng/api';
import { normalizerInterceptor } from './core/interceptors/normalizer.interceptor';
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withFetch(),
      withInterceptors([networkCheckerInterceptor, authInterceptor, normalizerInterceptor])
    ),
    provideRouter(routes),
    providePrimeNG(theme),
    MessageService
  ]
};
