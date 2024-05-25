import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HeroService } from './hero.service';
import { environment } from 'src/environments/environment';
import { IHero, Rate } from '../interfaces/hero';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const toastr = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        HeroService,
        { provide: ToastrService, useValue: toastr }
      ]
    });

    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getHeroes', () => {
    it('should return heroes with specific fields', () => {
      const mockHeroes: IHero[] = [
        { heroName: 'Superman', userId: '1', powers: ['fly'], rates: [] }
      ];

      service.getHeroes().subscribe(heroes => {
        expect(heroes).toEqual([
          { heroName: 'Superman', userId: '1', powers: ['fly'], rates: [] }
        ]);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}hero`);
      expect(req.request.method).toBe('GET');
      req.flush(mockHeroes);
    });
  });

  describe('#rateHero', () => {
    it('should rate a hero successfully', () => {
      const heroId = '1';
      const rate = 5;
      const raterId = '2';
      sessionStorage.setItem('userId', raterId);
      const mockHeroesResponse = [{ id: heroId, heroName: 'Superman', userId: '1', powers: ['fly'], rates: [] }];
      const mockHeroResponse = { ...mockHeroesResponse[0], rates: [{ raterId, rate: rate.toString() }] };

      service.rateHero(heroId, rate).subscribe(hero => {
        expect(hero).toEqual(mockHeroResponse);
        expect(toastrSpy.success).toHaveBeenCalledWith('Hero rated successfully');
      });

      const reqGet = httpMock.expectOne(`${environment.apiUrl}hero?userId=${heroId}`);
      expect(reqGet.request.method).toBe('GET');
      reqGet.flush(mockHeroesResponse);

      const reqPut = httpMock.expectOne(`${environment.apiUrl}hero/${heroId}`);
      expect(reqPut.request.method).toBe('PUT');
      reqPut.flush(mockHeroResponse);
    });

    it('should return error if user is not authenticated', () => {
      sessionStorage.removeItem('userId');

      service.rateHero('1', 5).subscribe({
        error: (error) => {
          expect(error).toBe('User not authenticated');
        }
      });

      httpMock.expectNone(`${environment.apiUrl}hero?userId=1`);
    });

    it('should return error if user rates themselves', () => {
      const heroId = '1';
      const rate = 5;
      sessionStorage.setItem('userId', heroId);

      service.rateHero(heroId, rate).subscribe({
        error: (error) => {
          expect(error).toBe('You can not rate yourself!');
        }
      });

      httpMock.expectNone(`${environment.apiUrl}hero?userId=1`);
    });
  });

  describe('#avgRates', () => {
    it('should return the average rate', () => {
      const rates: Rate[] = [
        { raterId: '1', rate: '4' },
        { raterId: '2', rate: '6' }
      ];

      const avg = service.avgRates(rates);
      expect(avg).toBe(5);
    });

    it('should return 0 if no rates are provided', () => {
      const avg = service.avgRates([]);
      expect(avg).toBe(0);
    });
  });

  describe('#getHeroById', () => {
    it('should return hero by id', () => {
      const heroId = 1;
      const mockHero = { id: heroId, heroName: 'Superman', userId: '1', powers: ['fly'], rates: [] };

      service.getHeroById(heroId).subscribe(hero => {
        expect(hero).toEqual(mockHero);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}hero?id=${heroId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockHero);
    });
  });

  describe('#getUserByEmail', () => {
    it('should return user by email', () => {
      const email = 'test@example.com';
      const mockUser = [{ id: '1', email: 'test@example.com' }];

      service.getUserByEmail(email).subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}user?email=${email}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });
  });
});
