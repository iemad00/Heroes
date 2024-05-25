import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { RatingDialogComponent } from './rating-dialog.component';
import { RateHero } from 'src/app/states/hero/hero.actions';

describe('RatingDialogComponent', () => {
  let component: RatingDialogComponent;
  let fixture: ComponentFixture<RatingDialogComponent>;
  let storeSpy: jasmine.SpyObj<Store>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<RatingDialogComponent>>;

  beforeEach(async () => {
    const store = jasmine.createSpyObj('Store', ['dispatch']);
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RatingDialogComponent],
      providers: [
        { provide: Store, useValue: store },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<RatingDialogComponent>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.ratingForm.value).toEqual({ stars: 0 });
  });

  it('should validate the form correctly', () => {
    const starsControl = component.ratingForm.controls['stars'];

    starsControl.setValue(0);
    expect(starsControl.valid).toBeFalse();

    starsControl.setValue(3);
    expect(starsControl.valid).toBeTrue();

    starsControl.setValue(6);
    expect(starsControl.valid).toBeFalse();
  });

  it('should dispatch RateHero action and close the dialog on submit', () => {
    storeSpy.dispatch.and.returnValue(of({}));
    component.ratingForm.controls['stars'].setValue(4);

    component.submit();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(new RateHero(component.data, 4));
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
