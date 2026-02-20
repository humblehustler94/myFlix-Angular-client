import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component representing a dialog that displays information about a movie.
 * @description This component is used as a generic dialog to display different types 
 * of data, such as a movie's genre details, director information, or synopsis.
 */
@Component({
  selector: 'app-movie-info',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './movie-info.html',
  styleUrls: ['./movie-info.scss']
})
export class MovieInfoComponent implements OnInit {

  /**
   * @param data - Data object injected into the dialog via MAT_DIALOG_DATA.
   * Includes a `title` (the name of the genre, director, etc.) and `content` (the detailed description).
   * @param dialogRef - Reference to the dialog instance, allowing the component to interact with the dialog.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
    },
    public dialogRef: MatDialogRef<MovieInfoComponent>
  ) {}

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   */
  ngOnInit(): void {}
}