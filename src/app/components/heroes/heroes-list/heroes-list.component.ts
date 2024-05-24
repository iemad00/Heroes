import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroProfileComponent } from '../hero-profile/hero-profile.component';
import { HeroDetailsComponent } from '../hero-profile/hero-details/hero-details.component';
import { RatingDialogComponent } from '../../shared/rating-dialog/rating-dialog.component';
import { HeroService } from 'src/app/services/hero.service';
import { IHero, Rate } from 'src/app/interfaces/hero';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit {

  sortBy: 'name'|'power' = 'name';

  filteredHeroes: IHero[] = [];
  heroes: IHero[] = [];

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private heroService: HeroService
  ){}

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((res: any) => {
      this.heroes = res;
      this.filteredHeroes = this.heroes;
      this.sortHeros(this.sortBy);
      console.log(this.heroes);

    })

  }

  search(event: any){
    this.filteredHeroes = this.heroes.filter(hero => hero.heroName.toLowerCase().includes(event.target.value))
    this.sortHeros(this.sortBy);
  }

  sortHeros(soryBy: 'name'|'power'): void {
    this.sortBy = soryBy;
    this.filteredHeroes = this.filteredHeroes.sort((a, b) => {
      return this.sortBy === 'name' ? a.heroName.localeCompare(b.heroName) : b.powers.length - a.powers.length;
    });
  }

  hasRated(rates: Rate[]|undefined): boolean{
    const currentUserId = this.authService.currentUserId
    if(!(rates && currentUserId))
      return false;

    if(rates.filter(r => r.raterId == currentUserId).length > 0)
      return true;

    return false;
  }

  avgRates(rates: Rate[] | undefined): number {
    if (!rates || rates.length === 0)
      return 0;


    const total = rates.reduce((sum, rate) => sum + parseFloat(rate.rate), 0);
    return total / rates.length;
  }


  heroDetails(hero: any){
    this.dialog.open(HeroDetailsComponent, {
      data: hero,
      width: '400px'
    })
  }

  rate(heroId: string){
    this.dialog.open(RatingDialogComponent, {
      data: heroId,
      width: '400px'
    })
  }

  addHero(){
    this.dialog.open(HeroDetailsComponent, {
      width: '400px'
    })
  }

}
