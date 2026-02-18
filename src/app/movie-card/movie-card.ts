// src/app/movie-card/movie-card.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <--- ADDED import ChangeDetectorRef
import { CommonModule } from '@angular/common'; // <--- CRITICAL FOR *ngFor
import { FetchApiDataService } from '../fetch-api-data';

// --- Material Design Imports ---
import { MatCardModule } from '@angular/material/card'; // <--- CRITICAL FOR <mat-card>
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog ,MatDialogModule } from '@angular/material/dialog'; // Imported MatDialog service
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Imported SnackBar


// --- Custom Component Import ---
// This assumes you ran 'ng g c movie-info' successfully in step 1
import { MovieInfoComponent } from '../movie-info/movie-info';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule, // <--- This fixes the *ngFor error
    MatCardModule, // <--- This fixes the <mat-card> error
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule // Add this to imports
  ],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private detector: ChangeDetectorRef, // <--- Inject it here
    public dialog: MatDialog, // Inject Dialog Service
    public snackBar: MatSnackBar // Inject SnackBar Service
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);

      // <--- ADD THIS LINE: This forces the view to update with the new data
      this.detector.detectChanges();
    });
  }

  // --- 1. OPEN GENRE DIALOG ---
  openGenre(movie: any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: movie.Genre.Name,
        content: movie.Genre.Description
      },
      width: '400px'
    });
  }

  // --- 2. OPEN DIRECTOR DIALOG ---
  openDirector(movie: any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: movie.Director.Name,
        content: movie.Director.Bio
      },
      width: '400px'
    });
  } 

  // --- 3. OPEN SYNOPSIS DIALOG ---
  openSynopsis(movie: any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: movie.Title,
        content: movie.Description
      },
      width: '400px'
    });
  }

  // --- 4. ADD TO FAVORITES ---
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe({
      next: (result) => {
        console.log(result);
        this.snackBar.open('Movie added to favorite.', 'OK', {
          duration: 2000,
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to add favorite.', 'OK', {
          duration: 2000,
        });
      }
    });
  }
}