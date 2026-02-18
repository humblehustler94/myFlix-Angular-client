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
// --- NEW: Import Router ---
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './user-login-form.html',
  styleUrl: './user-login-form.scss'
})
export class UserLoginFormComponent implements OnInit {
  // --- FIX: Renamed 'loginData' to 'userData' to match the logic below
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router // <--- Inject Router
  ) { }

  ngOnInit(): void { }

    loginUser(): void {
      // Now 'this.userData' matches the variable at the top
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        // Logic for successful login
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        
        this.dialogRef.close();
        this.snackBar.open('User login successful', 'OK', { duration: 2000 });
        
        this.router.navigate(['movies']); // <--- Add this line!
      },
      error: (result) => {
        this.snackBar.open('User login failed', 'OK', { duration: 2000 });
      }
    });
  }
}


