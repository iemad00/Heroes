import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesListComponent } from './heroes-list.component';
import { AuthService } from 'src/app/services/auth.service';
import { HeroService } from 'src/app/services/hero.service';
import { Store, NgxsModule } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let heroService: jasmine.SpyObj<HeroService>;
  let store: Store;
  let toastr: jasmine.SpyObj<ToastrService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'currentUserId']);
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['avgRates']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [
        HeroesListComponent
      ],
      imports: [
        NgxsModule.forRoot([]),
        MatDialogModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    store = TestBed.inject(Store);
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter heroes based on search input', () => {
    const mockHeroes = [
      { id: '1', heroName: 'Superman', powers: ['Fly'], userId: '1', rates: [] },
      { id: '2', heroName: 'Batman', powers: ['Martial Arts'], userId: '2', rates: [] },
    ];

    component.heroes = mockHeroes;
    component.search({ target: { value: 'super' } });

    expect(component.filteredHeroes).toEqual([mockHeroes[0]]);
  });

  it('should sort heroes by name', () => {
    const mockHeroes = [
      { id: '1', heroName: 'Batman', powers: ['Martial Arts'], userId: '2', rates: [] },
      { id: '2', heroName: 'Superman', powers: ['Fly'], userId: '1', rates: [] },
    ];

    component.filteredHeroes = [...mockHeroes];
    component.sortHeros('name');

    expect(component.filteredHeroes[0].heroName).toBe('Batman');
    expect(component.filteredHeroes[1].heroName).toBe('Superman');
  });

  it('should open hero details dialog when heroDetails is called', () => {
    authService.isAuthenticated.and.returnValue(true);
    component.heroDetails('1');
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should show error if trying to view details without authentication', () => {
    authService.isAuthenticated.and.returnValue(false);
    component.heroDetails('1');
    expect(toastr.error).toHaveBeenCalledWith("You should login to view details");
  });

  it('should open rating dialog when rate is called', () => {
    component.rate('1');
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should add hero dialog when addHero is called', () => {
    component.addHero();
    expect(dialog.open).toHaveBeenCalled();
  });
});
