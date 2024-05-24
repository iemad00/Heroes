import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesLayoutRoutes } from './heroes-layout.routing';
import { RouterModule } from '@angular/router';
import { AddHeroComponent } from 'src/app/components/heroes/add-hero/add-hero.component';
import { HeroProfileComponent } from 'src/app/components/heroes/hero-profile/hero-profile.component';
import { HeroesListComponent } from 'src/app/components/heroes/heroes-list/heroes-list.component';
import { StarRatingPipe } from 'src/app/pipes/star-rating.pipe';
import { HeroDetailsComponent } from 'src/app/components/heroes/hero-profile/hero-details/hero-details.component';



@NgModule({
  declarations: [
    AddHeroComponent,
    HeroesListComponent,
    HeroProfileComponent,
    HeroDetailsComponent,
    StarRatingPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HeroesLayoutRoutes),
  ]
})
export class HeroesLayoutModule { }
