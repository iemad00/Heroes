import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailsComponent } from './hero-details.component';
import { AuthService } from 'src/app/services/auth.service';
import { HeroService } from 'src/app/services/hero.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeroDetailsComponent', () => {
  let component: HeroDetailsComponent;
  let fixture: ComponentFixture<HeroDetailsComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let heroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getHero', 'getAdmin']);
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['avgRates']);

    await TestBed.configureTestingModule({
      declarations: [HeroDetailsComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: 'userId' }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    authService.getHero.and.returnValue(of([]));
    authService.getAdmin.and.returnValue(of([]));

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should fetch hero on init if userId is provided', () => {
    const mockHeroResponse = [{ id: '1', heroName: 'Superman', age: '30', gender: 'm', powers: ['fly'], rates: [] }];
    authService.getHero.and.returnValue(of(mockHeroResponse));

    fixture.detectChanges();

    expect(authService.getHero).toHaveBeenCalled();
    expect(component.hero).toEqual(mockHeroResponse[0]);
  });

  it('should fetch admin if hero is not found', () => {
    const mockAdminResponse = [{ id: '1', name: 'Admin' }];
    authService.getHero.and.returnValue(of([]));
    authService.getAdmin.and.returnValue(of(mockAdminResponse));

    fixture.detectChanges();

    expect(authService.getHero).toHaveBeenCalled();
    expect(authService.getAdmin).toHaveBeenCalled();
    expect(component.admin).toEqual(mockAdminResponse[0]);
  });

});
