import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// --- UPDATED MATERIAL IMPORTS ---
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'; // Added MatDialog here
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

// --- 1. IMPORT YOUR NEW COMPONENT ---
// --- NEW: impoprt registration component ---
// --- FIX: Removed '.component' from the end of the path ---
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form';
// --- NEW: import login component ---
import { UserLoginFormComponent } from './user-login-form/user-login-form';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    // --- 2. ADD THE COMPONENT TO IMPORTS ---
    //UserRegistrationFormComponent 
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('myFlix-Angular-client');

  
  constructor(public dialog: MatDialog) { }

  // --- FUNCTION TO OPEN THE REGISTRATION DIALOG ---
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  // --- FUNCTION TO OPEN LOGIN DIALOG ---
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}