import { Routes } from '@angular/router';
import { HeroProfileComponent } from '../../components/heroes/hero-profile/hero-profile.component';
import { HeroesListComponent } from 'src/app/components/heroes/heroes-list/heroes-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


export const HeroesLayoutRoutes: Routes = [
  { path: 'heroes', component: HeroesListComponent },
  { path: 'my-profile', component: HeroProfileComponent, canActivate: [AuthGuard], data: { requiresAuth: true }}
];
