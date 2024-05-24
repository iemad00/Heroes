import { IHero } from "src/app/interfaces/hero";
import { IUser } from "src/app/interfaces/user";

export class GetHeroList {
  static readonly type = '[Hero] Get Current Hero List';
}

export class CreateHero {
  static readonly type = '[Hero] Create a Hero';
  constructor(public hero: IHero, public credentials: IUser) {}
}

export class RateHero {
  static readonly type = '[Hero] Rate a Hero';
  constructor(public heroId: string, public rate: number) {}
}
