import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroProfileComponent } from './hero-profile.component';
import { AuthService } from 'src/app/services/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { IUser } from 'src/app/interfaces/user';
import { IAdmin } from 'src/app/interfaces/admin';

describe('HeroProfileComponent', () => {
  let component: HeroProfileComponent;
  let fixture: ComponentFixture<HeroProfileComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      currentHero: of([]),
      currentAdmin: of([])
    });

    await TestBed.configureTestingModule({
      declarations: [HeroProfileComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unrecognized elements
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch hero on init', () => {
    const mockHeroResponse: IUser[] = [{ id: '1', email: 'superman@example.com', password: 'password', role: 'hero' }];
    (Object.getOwnPropertyDescriptor(authService, 'currentHero')!.get as jasmine.Spy).and.returnValue(of(mockHeroResponse));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.hero).toEqual(mockHeroResponse[0]);
  });

  it('should fetch admin if hero is not found', () => {
    const mockHeroResponse: IUser[] = [];
    const mockAdminResponse: IAdmin[] = [{ id: '1', name: 'Admin' }];
    (Object.getOwnPropertyDescriptor(authService, 'currentHero')!.get as jasmine.Spy).and.returnValue(of(mockHeroResponse));
    (Object.getOwnPropertyDescriptor(authService, 'currentAdmin')!.get as jasmine.Spy).and.returnValue(of(mockAdminResponse));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.hero).toBeUndefined();
    expect(component.admin).toEqual(mockAdminResponse[0]);
  });

  it('should render hero details', () => {
    const mockHeroResponse: IUser[] = [{ id: '1', email: 'superman@example.com', password: 'password', role: 'hero' }];
    (Object.getOwnPropertyDescriptor(authService, 'currentHero')!.get as jasmine.Spy).and.returnValue(of(mockHeroResponse));

    component.ngOnInit();
    fixture.detectChanges();

    const heroDetailsElement = fixture.debugElement.query(By.css('app-hero-details'));
    expect(heroDetailsElement).toBeTruthy();
    expect(heroDetailsElement.componentInstance.hero).toEqual(mockHeroResponse[0]);
    expect(heroDetailsElement.componentInstance.admin).toBeUndefined();
  });

  it('should render admin details if hero is not found', () => {
    const mockHeroResponse: IUser[] = [];
    const mockAdminResponse: IAdmin[] = [{ id: '1', name: 'Admin' }];
    (Object.getOwnPropertyDescriptor(authService, 'currentHero')!.get as jasmine.Spy).and.returnValue(of(mockHeroResponse));
    (Object.getOwnPropertyDescriptor(authService, 'currentAdmin')!.get as jasmine.Spy).and.returnValue(of(mockAdminResponse));

    component.ngOnInit();
    fixture.detectChanges();

    const heroDetailsElement = fixture.debugElement.query(By.css('app-hero-details'));
    expect(heroDetailsElement).toBeTruthy();
    expect(heroDetailsElement.componentInstance.hero).toBeUndefined();
    expect(heroDetailsElement.componentInstance.admin).toEqual(mockAdminResponse[0]);
  });
});
