import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HeroesLayoutComponent } from './layouts/heroes-layout/heroes-layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HeroesLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/heroes-layout/heroes-layout.module').then(m => m.HeroesLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },
  { path: '**', redirectTo: 'heroes' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
