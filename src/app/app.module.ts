import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisrerComponent } from './components/auth/regisrer/regisrer.component';
import { AddHeroComponent } from './components/heroes/add-hero/add-hero.component';
import { HeroesListComponent } from './components/heroes/heroes-list/heroes-list.component';
import { HeroProfileComponent } from './components/heroes/hero-profile/hero-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { HeroesLayoutModule } from './layouts/heroes-layout/heroes-layout.module';

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
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthLayoutModule,
    HeroesLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
