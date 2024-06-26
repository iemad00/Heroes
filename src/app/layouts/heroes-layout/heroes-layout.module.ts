import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesLayoutRoutes } from './heroes-layout.routing';
import { RouterModule } from '@angular/router';
import { HeroProfileComponent } from 'src/app/components/heroes/hero-profile/hero-profile.component';
import { HeroesListComponent } from 'src/app/components/heroes/heroes-list/heroes-list.component';
import { StarRatingPipe } from 'src/app/pipes/star-rating.pipe';
import { HeroDetailsComponent } from 'src/app/components/heroes/hero-profile/hero-details/hero-details.component';
import { FormArrayInputComponent } from 'src/app/components/shared/form-array-input/form-array-input.component';
import { InputComponent } from 'src/app/components/shared/input/input.component';
import { RadioInputComponent } from 'src/app/components/shared/radio-input/radio-input.component';
import { CreateHeroFormComponent } from 'src/app/components/shared/create-hero-form/create-hero-form.component';
import { RatingDialogComponent } from 'src/app/components/shared/rating-dialog/rating-dialog.component';
import { HasPermissionDirective } from 'src/app/directives/has-permission.directive';



@NgModule({
  declarations: [
    HeroesListComponent,
    HeroProfileComponent,
    HeroDetailsComponent,
    StarRatingPipe,
    HasPermissionDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HeroesLayoutRoutes),
    InputComponent,
    FormArrayInputComponent,
    RadioInputComponent,
    CreateHeroFormComponent,
    RatingDialogComponent,

  ]
})
export class HeroesLayoutModule { }
