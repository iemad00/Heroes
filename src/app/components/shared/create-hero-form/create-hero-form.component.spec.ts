import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CreateHeroFormComponent } from './create-hero-form.component';
import { HeroService } from 'src/app/services/hero.service';
import { Store } from '@ngxs/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('CreateHeroFormComponent', () => {
  let component: CreateHeroFormComponent;
  let fixture: ComponentFixture<CreateHeroFormComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let router: jasmine.SpyObj<Router>;
  let toastr: jasmine.SpyObj<ToastrService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<CreateHeroFormComponent>>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['']); // No methods specified
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CreateHeroFormComponent
      ],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: Store, useValue: storeSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<CreateHeroFormComponent>>;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the form correctly', () => {
    const form = component.signUpForm;
    form.controls['heroName'].setValue('Superman');
    form.controls['age'].setValue('30');
    form.controls['gender'].setValue('Male');
    form.controls['email'].setValue('superman@example.com');
    form.controls['password'].setValue('Password1!');
    form.controls['confirmPassword'].setValue('Password1!');

    form.setControl('powers', new FormArray([
      new FormGroup({
        power: new FormControl('Fly', Validators.required)
      })
    ]));

    expect(form.valid).toBeTrue();
  });

  it('should add and remove powers', () => {
    component.addPower();
    expect(component.powers.length).toBe(2);

    component.removePower(0);
    expect(component.powers.length).toBe(1);
  });

  it('should show error if passwords do not match', () => {
    const form = component.signUpForm;
    form.controls['password'].setValue('Password1!');
    form.controls['confirmPassword'].setValue('Password2!');
    fixture.detectChanges();
    expect(component.isPasswordMatch()).toBeFalse();
  });

  it('should sign up successfully and navigate to login', () => {
    store.dispatch.and.returnValue(of(true));

    const form = component.signUpForm;
    form.controls['heroName'].setValue('Superman');
    form.controls['age'].setValue('30');
    form.controls['gender'].setValue('m');
    form.controls['email'].setValue('superman@example.com');
    form.controls['password'].setValue('Password1!');
    form.controls['confirmPassword'].setValue('Password1!');
    component.submit();

    fixture.detectChanges();

    expect(component.loading).toBeFalse();
  });

});
