import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetHeroList, CreateHero, RateHero } from './hero.actions';
import { IHero } from 'src/app/interfaces/hero';
import { HeroService } from 'src/app/services/hero.service';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError, throwError, from } from 'rxjs';

export interface HeroStateModel {
  heroList: IHero[];
}

@State<HeroStateModel>({
  name: 'hero',
  defaults: {
    heroList: []
  }
})

@Injectable()
export class HeroState {
  constructor
  (private heroService: HeroService,
    private toastr: ToastrService
    ) {}

  @Selector()
  static heroes(state: HeroStateModel) {
    return state.heroList;
  }

  @Action(GetHeroList)
  getHeroList(ctx: StateContext<HeroStateModel>) {
    return this.heroService.getHeroes().subscribe((heroes: any) => {
      ctx.patchState({ heroList: heroes });
    });
  }

  @Action(CreateHero)
  createHero(ctx: StateContext<HeroStateModel>, action: CreateHero) {
    return from(this.heroService.createHero(action.hero, action.credentials)).pipe(
      tap((newHero: IHero) => {
        const state = ctx.getState();
        ctx.patchState({ heroList: [...state.heroList, newHero] });
      }),
      catchError((err) => {
        this.toastr.error(err);
        throw err;
      })
    );
  }

  @Action(RateHero)
  async rateHero(ctx: StateContext<HeroStateModel>, action: RateHero) {
      this.heroService.rateHero(action.heroId, action.rate).subscribe((updatedHero)=>{

        const state = ctx.getState();
        const heroList = state.heroList.map(hero =>
          hero.id === updatedHero.id ? updatedHero : hero
        );
        ctx.patchState({ heroList });

      },err=>{
        this.toastr.error(err)
      });

  }

}
