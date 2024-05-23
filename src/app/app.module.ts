import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisrerComponent } from './components/auth/regisrer/regisrer.component';
import { AddHeroComponent } from './components/heroes/add-hero/add-hero.component';
import { HeroesListComponent } from './components/heroes/heroes-list/heroes-list.component';
import { HeroProfileComponent } from './components/heroes/hero-profile/hero-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisrerComponent,
    AddHeroComponent,
    HeroesListComponent,
    HeroProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
