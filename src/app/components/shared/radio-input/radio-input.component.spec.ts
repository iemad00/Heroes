import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RadioInputComponent } from './radio-input.component';
import { By } from '@angular/platform-browser';

describe('RadioInputComponent', () => {
  let component: RadioInputComponent;
  let fixture: ComponentFixture<RadioInputComponent>;
  let formGroup: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RadioInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioInputComponent);
    component = fixture.componentInstance;

    formGroup = new FormGroup({
      gender: new FormControl('')
    });

    component.formGroup = formGroup;
    component.controlName = 'gender';
    component.label = 'Gender';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render radio buttons', () => {
    const maleRadioButton = fixture.debugElement.query(By.css('#maleRadioCheck'));
    const femaleRadioButton = fixture.debugElement.query(By.css('#femaleRadioCheck'));

    expect(maleRadioButton).toBeTruthy();
    expect(femaleRadioButton).toBeTruthy();
  });

  it('should update the form control value when a radio button is selected', () => {
    const maleRadioButton = fixture.debugElement.query(By.css('#maleRadioCheck')).nativeElement;
    const femaleRadioButton = fixture.debugElement.query(By.css('#femaleRadioCheck')).nativeElement;

    maleRadioButton.click();
    fixture.detectChanges();
    expect(formGroup.controls['gender'].value).toBe('m');

    femaleRadioButton.click();
    fixture.detectChanges();
    expect(formGroup.controls['gender'].value).toBe('f');
  });

  it('should reflect the correct radio button as checked based on the form control value', () => {
    formGroup.controls['gender'].setValue('m');
    fixture.detectChanges();

    const maleRadioButton = fixture.debugElement.query(By.css('#maleRadioCheck')).nativeElement;
    const femaleRadioButton = fixture.debugElement.query(By.css('#femaleRadioCheck')).nativeElement;

    expect(maleRadioButton.checked).toBeTrue();
    expect(femaleRadioButton.checked).toBeFalse();

    formGroup.controls['gender'].setValue('f');
    fixture.detectChanges();

    expect(maleRadioButton.checked).toBeFalse();
    expect(femaleRadioButton.checked).toBeTrue();
  });
});
