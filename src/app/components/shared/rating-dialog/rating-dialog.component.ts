import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RatingDialogComponent {
  loading: boolean = false;

  ratingForm = new FormGroup({
    stars: new FormControl(0, [Validators.min(1), Validators.max(5)]),
  });


  submit(){

  }
}
