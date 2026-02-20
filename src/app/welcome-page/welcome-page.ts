import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form';
import { MatDialog } from '@angular/material/dialog';

/** Imports for UI **/
import { MatButtonModule } from '@angular/material/button';

/**
 * Component representing the welcome/landing page of the application.
 * @description This component serves as the initial entry point for users. 
 * it provides options to either register for a new account or log in to an existing one
 * by opening the respective dialog components.
 */
@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss',
})
export class WelcomePageComponent implements OnInit {

  /**
   * @param dialog - Service used to open Material Dialog modals.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   */
  ngOnInit(): void { }

  /**
   * Opens the user registration dialog.
   * @description When the "Register" button is clicked, this method opens the
   * UserRegistrationFormComponent in a dialog modal.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog.
   * @description When the "Login" button is clicked, this method opens the
   * UserLoginFormComponent in a dialog modal.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}