import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HeroService } from 'src/app/services/hero.service';

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
    private heroService: HeroService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){}


  submit(){
    this.heroService.rateHero(this.data!, this.ratingForm.value.stars!).subscribe(()=>{}
    , err=>{
      this.toastr.error(err)
    });

  }
}
