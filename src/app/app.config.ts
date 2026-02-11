import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from '@angular/common/http'; // 1st code line

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // 2nd code line

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(), // <-- Add this line 1st
    provideAnimationsAsync() // <-- Add this to the providers array 2nd.
  ]
};
