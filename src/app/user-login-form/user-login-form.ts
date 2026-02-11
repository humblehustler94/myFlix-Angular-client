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

@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './user-login-form.html',
  styleUrl: './user-login-form.scss'
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe((result: any) => {
      // Logic for a successful user login
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
      
      this.dialogRef.close(); // Close the modal on success
      this.snackBar.open('Logged in successfully!', 'OK', {
        duration: 2000
      });
      // Redirect to movies view (to be implemented later)
    }, (result: any) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}