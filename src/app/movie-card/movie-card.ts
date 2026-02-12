// src/app/movie-card/movie-card.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <--- ADDED import ChangeDetectorRef
import { CommonModule } from '@angular/common'; // <--- CRITICAL FOR *ngFor
import { FetchApiDataService } from '../fetch-api-data';

// Material Imports
import { MatCardModule } from '@angular/material/card'; // <--- CRITICAL FOR <mat-card>
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule, // <--- This fixes the *ngFor error
    MatCardModule, // <--- This fixes the <mat-card> error
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private detector: ChangeDetectorRef // <--- Inject it here
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
}