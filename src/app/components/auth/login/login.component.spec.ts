import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let loadingSubject: Subject<boolean>;

  beforeEach(async () => {
    loadingSubject = new Subject<boolean>();

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signIn'], {
      loading$: loadingSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.signInForm.valid).toBeFalsy();
  });

  it('should have valid form when email and password are set', () => {
    component.signInForm.controls['email'].setValue('test@example.com');
    component.signInForm.controls['password'].setValue('password');
    expect(component.signInForm.valid).toBeTruthy();
  });

  it('should call authService.signIn on form submit', () => {
    component.signInForm.controls['email'].setValue('test@example.com');
    component.signInForm.controls['password'].setValue('password');
    fixture.detectChanges();

    const button: DebugElement = fixture.debugElement.query(By.css('button[type="submit"]'));
    button.triggerEventHandler('click', null);

    expect(authService.signIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should disable button when form is invalid', () => {
    component.signInForm.controls['email'].setValue('');
    component.signInForm.controls['password'].setValue('');
    fixture.detectChanges();

    const button: DebugElement = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should show Sign in text when not loading', () => {
    loadingSubject.next(false);
    fixture.detectChanges();

    const button: HTMLElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.textContent).toContain('Sign in');
  });

  it('should show loading spinner when loading', () => {
    loadingSubject.next(true);
    fixture.detectChanges();

    const button: HTMLElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.innerHTML).toContain('fa-spinner');
  });
});
