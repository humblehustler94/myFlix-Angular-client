import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page';
import { MovieCardComponent } from './movie-card/movie-card';

export const routes: Routes = [
    { path: 'welcome', component: WelcomePageComponent},
    { path: 'movies', component: MovieCardComponent},
    { path: '', redirectTo: 'welcome', pathMatch: 'full'},
];
