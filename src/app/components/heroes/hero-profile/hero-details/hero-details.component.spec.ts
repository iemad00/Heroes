import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailsComponent } from './hero-details.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { HeroService } from 'src/app/services/hero.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HeroDetailsComponent', () => {
  let component: HeroDetailsComponent;
  let fixture: ComponentFixture<HeroDetailsComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getHero', 'getAdmin']);
    const heroSpy = jasmine.createSpyObj('HeroService', ['dummyMethod', 'avgRates']);

    await TestBed.configureTestingModule({
      declarations: [ HeroDetailsComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: '1' },
        { provide: AuthService, useValue: authSpy },
        { provide: HeroService, useValue: heroSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDetailsComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    heroServiceSpy = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;

    heroServiceSpy.avgRates.and.returnValue(0);
  });

  it('should fetch hero on init if userId is provided', () => {
    const mockHero = { id: '1', heroName: 'Superman', age: '30', gender: 'm', powers: ['fly'], rates: [] };
    authServiceSpy.getHero.and.returnValue(of(mockHero));

    fixture.detectChanges();

    expect(authServiceSpy.getHero).toHaveBeenCalledWith('1');
    expect(component.hero).toEqual(mockHero);
  });

  it('should fetch admin if hero is not found', () => {
    const mockAdmin = { id: '1', name: 'Admin' };
    authServiceSpy.getHero.and.returnValue(of(null));
    authServiceSpy.getAdmin.and.returnValue(of([mockAdmin]));

    fixture.detectChanges();

    expect(authServiceSpy.getHero).toHaveBeenCalledWith('1');
    expect(authServiceSpy.getAdmin).toHaveBeenCalledWith('1');
    expect(component.admin).toEqual(mockAdmin);
  });
});
