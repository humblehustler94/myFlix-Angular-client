// src/app/movie-card/movie-card.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FetchApiDataService } from '../fetch-api-data';
import { Router } from '@angular/router';

/**  --- Material Design Imports --- **/
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 

/**  --- Custom Component Import --- **/
import { MovieInfoComponent } from '../movie-info/movie-info';

/**
 * Component representing the movie card display.
 * @description This component fetches movie data and handles user interactions such as
 * viewing details (genre, director, synopsis), adding/removing favorites, and logging out.
 */
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule 
  ],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})
export class MovieCardComponent implements OnInit {
  /** Array holding all movie data fetched from the API */
  movies: any[] = [];

  /**
   * @param fetchApiData Service for API communication
   * @param router Service for navigation
   * @param detector Service to manually trigger change detection
   * @param dialog Service to open Material Dialogs
   * @param snackBar Service to display notifications
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    private detector: ChangeDetectorRef, 
    public dialog: MatDialog, 
    public snackBar: MatSnackBar 
  ) { }

  /**
   * Lifecycle hook called after component initialization.
   * Fetches the initial list of movies.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetches all movies from the backend API.
   * Updates the 'movies' array and triggers change detection.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      this.detector.detectChanges();
    });
  }

  /**
   * Navigates to the welcome screen and clears user data from local storage.
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  /**
   * Opens a dialog showing genre details.
   * @param movie The movie object containing genre information
   */
  openGenre(movie: any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: movie.Genre.Name,
        content: movie.Genre.Description
      },
      width: '400px'
    });
  }

  /**
   * Opens a dialog showing director details.
   * @param movie The movie object containing director information
   */
  openDirector(movie: any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: movie.Director.Name,
        content: movie.Director.Bio
      },
      width: '400px'
    });
  }

  /**
   * Opens a dialog showing the movie synopsis.
   * @param movie The movie object containing summary information
   */
  openSynopsis(movie: any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: movie.Title,
        content: movie.Description
      },
      width: '400px'
    });
  }

  /**
   * Adds a movie to the user's list of favorites via API.
   * Updates local storage with the new user data.
   * @param id The unique ID of the movie
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe({
      next: (result) => {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result));
        this.snackBar.open('Movie added to favorites.', 'OK', {
          duration: 2000,
        });
        this.detector.detectChanges(); // Trigger update so heart fills immediately
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to add favorite.', 'OK', {
          duration: 2000,
        });
      }
    });
  }

  /**
   * Checks if a movie is in the user's favorite list.
   * This is used in the HTML to determine which icon to show (filled heart vs border).
   * @param id The movie ID
   * @returns boolean - True if the movie is a favorite
   */
  isFavorite(id: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies && user.FavoriteMovies.includes(id);
  }

  /**
   * Removes a movie from the user's list of favorites via API.
   * @param id The unique ID of the movie
   */
  removeFavorite(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000,
      });
      this.detector.detectChanges();
    });
  }
}