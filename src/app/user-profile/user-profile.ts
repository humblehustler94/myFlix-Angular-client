import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core'; // 1. Added ChangeDetectorRef
import { FetchApiDataService } from '../fetch-api-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    private detector: ChangeDetectorRef // 2. Inject it here
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Fetch fresh user data from API
    this.fetchApiData.getUser(user.Username).subscribe((freshUser: any) => {
      this.userData = {
        Username: freshUser.Username,
        Email: freshUser.Email,
        Birthday: freshUser.Birthday,
        Password: ''
      };

      // Update localStorage with fresh data to keep FavoriteMovies array updated
      localStorage.setItem('user', JSON.stringify(freshUser));

      // Fetch all movies and filter to find favorites
      this.fetchApiData.getAllMovies().subscribe((movies: any) => {
        this.favoriteMovies = movies.filter((m: any) => {
          return freshUser.FavoriteMovies.includes(m._id);
        });

        // 3. CRITICAL: This fixes the NG0100 error and tells Angular to show the movies now
        this.detector.detectChanges();
      });
    });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('Profile updated successfully', 'OK', { duration: 2000 });
      this.getUser(); // Refresh data after update
    });
  }

  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
      // Update local array immediately for smooth UI
      this.favoriteMovies = this.favoriteMovies.filter((movie) => movie._id !== id);
      this.getUser(); // Reload everything to stay in sync with the database
    });
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser().subscribe({
        next: (response) => {
          // Because we used responseType: 'text', we just check if it was successful
          console.log('Account deleted:', response);
          this.snackBar.open('Account deleted successfully.', 'OK', {
            duration: 2000
          });

          // 1. Clear everything
          localStorage.clear();
          // 2. Redirect to welcome
          this.router.navigate(['welcome']);
        },
        error: (err) => {
          console.error('Delete error:', err);
          this.snackBar.open('Failed to delete account.', 'OK', {
            duration: 2000
          });
        }
      });
    }
  }
}
