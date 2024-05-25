import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unrecognized elements
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a link to the login page', () => {
    const loginLink = fixture.debugElement.query(By.css('a[routerLink="/login"]')).nativeElement;
    expect(loginLink.textContent).toContain('Login in');
  });

  it('should contain a link to the heroes list page', () => {
    const heroesLink = fixture.debugElement.query(By.css('a[routerLink="/heroes"]')).nativeElement;
    expect(heroesLink.textContent).toContain('Go to heroes list');
  });

  it('should contain the app-create-hero-form component', () => {
    const formComponent = fixture.debugElement.query(By.css('app-create-hero-form'));
    expect(formComponent).toBeTruthy();
  });
});
