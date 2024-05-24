export interface Rate {
  raterId: string;
  rate: string;
}

export interface IHero {
  id: string;
  heroName: string;
  age: string;
  gender: string;
  powers: string[];
  userId: string;
  rates?: Rate[];
  averageRate?: number;
}
