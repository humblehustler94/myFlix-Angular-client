import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from '@angular/common/http'; 

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // 2nd code line

/**
 * Global application configuration for the myFlix Angular app.
 * @description This constant defines the root providers used across the entire application.
 * It includes setup for:
 * - Routing (using app.routes.ts)
 * - HTTP Client (for API communication)
 * - Animations (for Material Design components)
 * - Global error listeners
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync() 
  ]
};