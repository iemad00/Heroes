import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHero } from '../interfaces/hero';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private url = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }


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
      return Promise.resolve(heroRes);

    } catch (error) {
      return Promise.reject(error);
    }
  }


  getHeroById(heroId: number){
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
