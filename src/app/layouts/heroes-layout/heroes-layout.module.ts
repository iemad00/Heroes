import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesLayoutRoutes } from './heroes-layout.routing';
import { RouterModule } from '@angular/router';
import { AddHeroComponent } from 'src/app/components/heroes/add-hero/add-hero.component';
import { HeroProfileComponent } from 'src/app/components/heroes/hero-profile/hero-profile.component';
import { HeroesListComponent } from 'src/app/components/heroes/heroes-list/heroes-list.component';



@NgModule({
  declarations: [
    AddHeroComponent,
    HeroesListComponent,
    HeroProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HeroesLayoutRoutes),
  ]
})
export class HeroesLayoutModule { }
