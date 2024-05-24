import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetHeroList, CreateHero } from './hero.actions';
import { IHero } from 'src/app/interfaces/hero';
import { tap } from 'rxjs/operators';
import { HeroService } from 'src/app/services/hero.service';

export interface HeroStateModel {
  heroList: IHero[];
  selectedHero: IHero | null;
}

@State<HeroStateModel>({
  name: 'hero',
  defaults: {
    heroList: [],
    selectedHero: null
  }
})

@Injectable()
export class HeroState {
  constructor(private heroService: HeroService) {}

  @Selector()
  static heroes(state: HeroStateModel) {
    return state.heroList;
  }

  @Selector()
  static selectedHero(state: HeroStateModel) {
    return state.selectedHero;
  }

  @Action(GetHeroList)
  getHeroList(ctx: StateContext<HeroStateModel>) {
    return this.heroService.getHeroes().subscribe((heroes: any) => {
      ctx.patchState({ heroList: heroes });
    });
  }

  @Action(CreateHero)
  createHero(ctx: StateContext<HeroStateModel>, action: CreateHero) {
    return this.heroService.getHeroes().subscribe((heroes: any) => {

      this.heroService.createHero(action.hero, action.credentials).then(newHero => {
        const state = ctx.getState();
        ctx.patchState({ heroList: [...state.heroList, newHero] });
      })

    });
  }

}
