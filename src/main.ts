import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

/**
 * Entry point for the myFlix Angular application.
 * @description This file is responsible for bootstrapping (starting) the Angular application.
 * It initializes the root component 'App' using the global configurations defined in 'appConfig'.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));