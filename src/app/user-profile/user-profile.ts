import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core'; 
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

/**
 * Component representing the user profile view.
 * @description This component allows users to view and edit their profile data, 
 * see their list of favorite movies, and manage their account (update/delete).
 */
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
  
  /** 
   * Input object holding user profile details 
   * @property {string} Username - The user's name
   * @property {string} Password - The user's password (usually empty for display)
   * @property {string} Email - The user's email
   * @property {string} Birthday - The user's date of birth
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /** Array holding movie objects that have been favorited by the user */
  favoriteMovies: any[] = [];

  /**
   * @param fetchApiData Service for API communication
   * @param snackBar Service for displaying notification messages
   * @param router Service for navigation between views
   * @param detector Service to manually trigger Angular change detection
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    private detector: ChangeDetectorRef 
  ) { }

  /**
   * Lifecycle hook called after component initialization.
   * Fetches user data to populate the profile.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Fetches the user data from the API and updates the local state.
   * Also filters the full movie list to identify the user's favorite movies.
   */
  getUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    /** Fetch fresh user data from API **/
    this.fetchApiData.getUser(user.Username).subscribe((freshUser: any) => {
      this.userData = {
        Username: freshUser.Username,
        Email: freshUser.Email,
        Birthday: freshUser.Birthday,
        Password: ''
      };

      /**  Update localStorage with fresh data to keep FavoriteMovies array updated **/
      localStorage.setItem('user', JSON.stringify(freshUser));

      /** Fetch all movies and filter to find favorites **/
      this.fetchApiData.getAllMovies().subscribe((movies: any) => {
        this.favoriteMovies = movies.filter((m: any) => {
          return freshUser.FavoriteMovies.includes(m._id);
        });

        /** This fixes the NG0100 error and tells Angular to show the movies now **/
        this.detector.detectChanges();
      });
    });
  }

  /**
   * Sends the updated user data to the backend API.
   * Updates local storage and provides feedback via SnackBar.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('Profile updated successfully', 'OK', { duration: 2000 });
      this.getUser();                   /** Refresh data after update **/
    });
  }

  /**
   * Removes a movie from the user's favorites list via the API.
   * Updates the local UI list and refreshes user data.
   * @param id The unique ID of the movie to remove
   */
  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', { duration: 2000 });
      /** Update local array immediately for smooth UI **/
      this.favoriteMovies = this.favoriteMovies.filter((movie) => movie._id !== id);
      this.getUser();                   /** Reload everything to stay in sync with the database **/
    });
  }

  /**
   * Permanently deletes the user's account after confirmation.
   * Clears local storage and redirects to the welcome page.
   */
  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser().subscribe({
        next: (response) => {
          console.log('Account deleted:', response);
          this.snackBar.open('Account deleted successfully.', 'OK', {
            duration: 2000
          });

          localStorage.clear();
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