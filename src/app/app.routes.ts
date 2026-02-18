import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page';
import { MovieCardComponent } from './movie-card/movie-card';
import { UserProfileComponent } from './user-profile/user-profile';

export const routes: Routes = [
    { path: 'profile', component: UserProfileComponent},
    { path: 'welcome', component: WelcomePageComponent},
    { path: 'movies', component: MovieCardComponent},
    { path: '', redirectTo: 'welcome', pathMatch: 'full'},
];
