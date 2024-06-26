import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetailsComponent } from '../hero-profile/hero-details/hero-details.component';
import { RatingDialogComponent } from '../../shared/rating-dialog/rating-dialog.component';
import { IHero, Rate } from 'src/app/interfaces/hero';
import { AuthService } from 'src/app/services/auth.service';
import { Store, Select } from '@ngxs/store';
import { GetHeroList } from 'src/app/states/hero/hero.actions';
import { HeroState } from 'src/app/states/hero/hero.state';
import { Observable } from 'rxjs';
import { HeroService } from 'src/app/services/hero.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit {

  sortBy: 'name'|'power' = 'name';

  filteredHeroes: IHero[] = [];
  heroes: IHero[] = [];
  @Select(HeroState.heroes) heroes$!: Observable<IHero[]>;

  constructor(
    private dialog: MatDialog,
    public authService: AuthService,
    public heroService: HeroService,
    private toastr: ToastrService,
    private store: Store
  ){}

  ngOnInit(): void {
    this.store.dispatch(new GetHeroList());

    this.heroes$.subscribe(heroes => {
      this.heroes = heroes
      this.filteredHeroes = this.heroes;
      this.sortHeros(this.sortBy);
    });
  }

  search(event: any): void {
    const searchValue = event.target.value.toLowerCase();

    this.filteredHeroes = this.heroes.filter(hero => {
      const heroNameMatch = hero.heroName.toLowerCase().includes(searchValue);
      const powersMatch = hero.powers.some(power => power.toLowerCase().includes(searchValue));
      return heroNameMatch || powersMatch;
    });

    this.sortHeros(this.sortBy);
  }

  sortHeros(sortBy: 'name' | 'power'): void {
    this.sortBy = sortBy;
    this.filteredHeroes = [...this.filteredHeroes].sort((a, b) => {
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

  heroDetails(heroId: string){
    if(!this.authService.isAuthenticated()){
      this.toastr.error("You should login to view details")
      return
    }

    this.dialog.open(HeroDetailsComponent, {
      data: heroId,
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
