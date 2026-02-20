import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data';
import { Router } from '@angular/router';

/**
 * Component representing the user login form.
 * @description This component provides a form for users to log in with their credentials.
 * Upon successful login, it stores the user data and token in local storage and 
 * navigates the user to the movie view.
 */
@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './user-login-form.html',
  styleUrl: './user-login-form.scss'
})
export class UserLoginFormComponent implements OnInit {
  
  /**
   * Input object that stores user login credentials.
   * @type {object}
   * @property {string} Username - The user's unique username.
   * @property {string} Password - The user's password.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * @param fetchApiData - Service used to perform the user login API call.
   * @param dialogRef - Reference to the dialog containing this component.
   * @param snackBar - Service used to display notifications to the user.
   * @param router - Service used for navigating to different routes.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router 
  ) { }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   */
  ngOnInit(): void { }

  /**
   * Sends the user's credentials to the backend via the FetchApiDataService.
   * If successful:
   * 1. Stores the user object and JWT token in localStorage.
   * 2. Closes the login dialog.
   * 3. Displays a success message via SnackBar.
   * 4. Navigates the user to the 'movies' route.
   * If unsuccessful, displays an error message via SnackBar.
   */
  loginUser(): void {
    // Now 'this.userData' matches the variable at the top
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        // Logic for successful login
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        
        this.dialogRef.close();
        this.snackBar.open('User login successful', 'OK', { duration: 2000 });
        
        this.router.navigate(['movies']); 
      },
      error: (result) => {
        this.snackBar.open('User login failed', 'OK', { duration: 2000 });
      }
    });
  }
}