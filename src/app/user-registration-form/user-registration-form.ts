import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Material Imports **/
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

/** API Service **/
/** --- FIX 1: Path change from '../fetch-api-data.service' to '../fetch-api-data' --- **/
import { FetchApiDataService } from '../fetch-api-data';

/**
 * Component representing the user registration form.
 * @description This component provides a form for new users to register for an account.
 * It interacts with the FetchApiDataService to send the registration details to the backend API.
 */
@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  /** --- FIX 2: Path change to './user-registration-form.html' (matching your file structure) --- **/
  templateUrl: './user-registration-form.html',
  styleUrl: './user-registration-form.scss'
})
export class UserRegistrationFormComponent implements OnInit {

  /** 
   * Input object that stores user registration data.
   * @type {object}
   * @property {string} Username - The chosen username.
   * @property {string} Password - The chosen password.
   * @property {string} Email - The user's email address.
   * @property {string} Birthday - The user's date of birth.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @param fetchApiData - Service used to perform the user registration API call.
   * @param dialogRef - Reference to the dialog containing this component.
   * @param snackBar - Service used to display notifications to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   */
  ngOnInit(): void { }

  /**
   * Sends the user's registration data to the backend via the FetchApiDataService.
   * Upon successful registration:
   * 1. The dialog (modal) is closed.
   * 2. A success message is displayed via SnackBar.
   * If registration fails, an error message is shown via SnackBar.
   */
  registerUser(): void {
    /**  --- FIX 3: Added ': any' to the result parameters to satisfy TypeScript --- **/
    this.fetchApiData.userRegistration(this.userData).subscribe((result: any) => {
      /** Logic for a successful user registration **/
      this.dialogRef.close();             /** Closes the modal on success **/
      console.log(result);
      this.snackBar.open('User registered successfully!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}