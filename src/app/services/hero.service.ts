import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { IUser } from '../interfaces/user';
import { ToastrService } from 'ngx-toastr';
import { IHero, Rate } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private url = 'http://localhost:3000/'

  constructor(private http: HttpClient, private toastr: ToastrService) { }


  async createHero(hero: IHero, credentials: IUser): Promise<any> {
    try {
      // Check if email already exists
      const users = await this.getUserByEmail(credentials.email).toPromise();
      if (users.length > 0)
        return Promise.reject('Email already exists!');

      // Register the user first, and then add hero data
      credentials.role = 'hero';
      const userRes: any = await this.http.post(`${this.url}user`, credentials).toPromise();
      hero.userId = userRes.id;
      const heroRes = await this.http.post(`${this.url}hero`, hero).toPromise();
      this.toastr.success('Hero Has Been Created Successfully!')
      return Promise.resolve(heroRes);

    } catch (error) {
      return Promise.reject(error);
    }
  }

  getHeroes(){
    return this.http.get(`${this.url}hero`).pipe(res => {
      return res;
    })
  }

  rateHero(heroId: string, rate: number): Observable<any> {
    const raterId = sessionStorage.getItem('userId');
    if (!raterId) {
      return throwError('User not authenticated');
    }

    return this.http.get(`${this.url}hero?userId=${heroId}`).pipe(
      switchMap((heroes: any) => {
        if (heroes.length === 0) {
          return throwError('Hero not found');
        }

        const hero = heroes[0];

        if (hero.rates?.some((r: Rate) => r.raterId === raterId)) {
          return throwError('You have rated this hero already!');
        }

        const newRate = {
          raterId,
          rate: rate.toString()
        };

        hero.rates = hero.rates || [];
        hero.rates.push(newRate);

        return this.http.put(`${this.url}hero/${hero.id}`, hero).pipe(
          map(() => {
            this.toastr.success('Hero rated successfully');
            return hero;
          }),
        );
      }),
    );
  }

  avgRates(rates: Rate[] | undefined): number {
    if (!rates || rates.length === 0)
      return 0;

    const total = rates.reduce((sum, rate) => sum + parseFloat(rate.rate), 0);
    return total / rates.length;
  }

  getHeroById(heroId: number): Observable<any>{
    return this.http.get(`${this.url}hero?id=${heroId}`).pipe(res => {
      return res;
    })
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.url}user?email=${email}`).pipe(res => {
      return res;
    })
  }

}
