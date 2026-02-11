import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Imports
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

// API Service
// --- FIX 1: Path change from '../fetch-api-data.service' to '../fetch-api-data' ---
import { FetchApiDataService } from '../fetch-api-data';

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
  // --- FIX 2: Path change to './user-registration-form.html' (matching your file structure) ---
  templateUrl: './user-registration-form.html',
  styleUrl: './user-registration-form.scss'
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  // Function responsible for sending form inputs to the backend
  registerUser(): void {
    // --- FIX 3: Added ': any' to the result parameters to satisfy TypeScript ---
    this.fetchApiData.userRegistration(this.userData).subscribe((result: any) => {
      // Logic for a successful user registration
      this.dialogRef.close(); // Closes the modal on success
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