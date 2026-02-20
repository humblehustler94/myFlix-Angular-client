import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page';
import { MovieCardComponent } from './movie-card/movie-card';
import { UserProfileComponent } from './user-profile/user-profile';

/**
 * Configuration of application routes.
 * @description These routes define the navigation structure of the app:
 * - 'profile' leads to the User Profile view.
 * - 'welcome' leads to the Landing page (Login/Registration).
 * - 'movies' leads to the main list of movies.
 * - Empty path ('') redirects users to the welcome page by default.
 */
export const routes: Routes = [
    { path: 'profile', component: UserProfileComponent},
    { path: 'welcome', component: WelcomePageComponent},
    { path: 'movies', component: MovieCardComponent},
    { path: '', redirectTo: 'welcome', pathMatch: 'full'},
];