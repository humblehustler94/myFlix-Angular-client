import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root component of the myFlix application.
 * @description This component acts as the main container for the application, 
 * providing the router outlet where all other components (Welcome, MovieCard, Profile) are rendered.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  /** The title of the application */
  title = 'my-flix-angular-client';
}