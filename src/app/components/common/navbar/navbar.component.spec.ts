import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'signOut']);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule, NgbCollapseModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unrecognized elements
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct menu items based on authentication', () => {
    // Authenticated scenario
    authService.isAuthenticated.and.returnValue(true);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.menuItems).toContain({ path: 'my-profile', title: 'My Profile' });

    // Not authenticated scenario
    authService.isAuthenticated.and.returnValue(false);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.menuItems).toContain({ path: 'login', title: 'Login' });
    expect(component.menuItems).toContain({ path: 'register', title: 'Create a new Account' });
  });

  it('should toggle isCollapsed when button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.navbar-toggler'));
    button.triggerEventHandler('click', null);
    expect(component.isCollapsed).toBeFalse();

    button.triggerEventHandler('click', null);
    expect(component.isCollapsed).toBeTrue();
  });

  it('should call signOut on authService when logout is confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.logout();
    expect(authService.signOut).toHaveBeenCalled();
  });

  it('should not call signOut on authService when logout is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.logout();
    expect(authService.signOut).not.toHaveBeenCalled();
  });



});
