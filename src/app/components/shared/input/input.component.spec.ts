import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputComponent } from './input.component';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let formGroup: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;

    formGroup = new FormGroup({
      testControl: new FormControl('', [Validators.required])
    });

    component.formGroup = formGroup;
    component.controlName = 'testControl';
    component.placeholder = 'Enter value';
    component.errorMessage = 'This field is required';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input with form control', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    expect(inputElement).toBeTruthy();
    expect(inputElement.nativeElement.placeholder).toBe('Enter value');
  });

  it('should display error message when control is invalid and touched', () => {
    const formControl = component.formGroup!.get(component.controlName!)!;
    formControl.setValue('');
    formControl.markAsTouched();
    fixture.detectChanges();

    const errorMessageElement = fixture.debugElement.query(By.css('small.text-danger'));
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent.trim()).toBe('This field is required');
  });

  it('should not display error message when control is valid', () => {
    const formControl = component.formGroup!.get(component.controlName!)!;
    formControl.setValue('valid value');
    formControl.markAsTouched();
    fixture.detectChanges();

    const errorMessageElement = fixture.debugElement.query(By.css('small.text-danger'));
    expect(errorMessageElement).toBeNull();
  });

  it('should display static input when no form group is provided', () => {
    component.formGroup = undefined;
    component.label = 'Static Label';
    component.value = 'Static Value';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label'));
    const staticInputElement = fixture.debugElement.query(By.css('input'));

    expect(labelElement).toBeTruthy();
    expect(labelElement.nativeElement.textContent.trim()).toBe('Static Label');
    expect(staticInputElement.nativeElement.value).toBe('Static Value');
    expect(staticInputElement.nativeElement.disabled).toBeTrue();
  });
});
