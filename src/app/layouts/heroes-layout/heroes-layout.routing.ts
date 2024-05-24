import { Routes } from '@angular/router';
import { AddHeroComponent } from '../../components/heroes/add-hero/add-hero.component';
import { HeroProfileComponent } from '../../components/heroes/hero-profile/hero-profile.component';
import { HeroesListComponent } from 'src/app/components/heroes/heroes-list/heroes-list.component';


export const HeroesLayoutRoutes: Routes = [
  { path: 'heroes', component: HeroesListComponent },
  { path: 'heroes/add', component: AddHeroComponent },
  { path: 'heroes/:id', component: HeroProfileComponent },
  { path: 'my-profile', component: HeroProfileComponent }
];
