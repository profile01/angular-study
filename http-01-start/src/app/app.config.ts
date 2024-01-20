import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';

import { routes } from './app.routes';
import { LoggingInterceptorService } from './logging-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi()), 
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: LoggingInterceptorService, 
      multi: true
    }
  ]
};
