import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { RateHero } from 'src/app/states/hero/hero.actions';

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

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<RatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){}


  submit(){
    this.store.dispatch(new RateHero(this.data!, this.ratingForm.value.stars!))
    .subscribe(()=>{
      this.dialogRef.close();
    })
  }
}
