import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';
import { FormArrayInputComponent } from './form-array-input.component';
import { By } from '@angular/platform-browser';

describe('FormArrayInputComponent', () => {
  let component: FormArrayInputComponent;
  let fixture: ComponentFixture<FormArrayInputComponent>;
  let parentForm: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormArrayInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArrayInputComponent);
    component = fixture.componentInstance;

    parentForm = new FormGroup({
      powers: new FormArray([
        new FormGroup({
          power: new FormControl('')
        })
      ])
    });

    component.parentForm = parentForm;
    component.formArray = parentForm.get('powers') as FormArray;
    component.controlName = 'powers';
    component.placeholder = 'Power';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new item to the form array', () => {
    spyOn(component.add, 'emit');
    const addButton = fixture.debugElement.query(By.css('a.link'));
    addButton.triggerEventHandler('click', null);
    expect(component.add.emit).toHaveBeenCalled();
  });

  it('should remove an item from the form array', () => {
    spyOn(component.remove, 'emit');
    component.formArray.push(new FormGroup({ power: new FormControl('') }));
    fixture.detectChanges();

    const removeButton = fixture.debugElement.query(By.css('.fa-times'));
    removeButton.triggerEventHandler('click', null);
    expect(component.remove.emit).toHaveBeenCalledWith(0);
  });

  it('should display correct number of input fields', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input.form-control'));
    expect(inputs.length).toBe(1);

    component.formArray.push(new FormGroup({ power: new FormControl('') }));
    fixture.detectChanges();

    const updatedInputs = fixture.debugElement.queryAll(By.css('input.form-control'));
    expect(updatedInputs.length).toBe(2);
  });

  it('should hide the add button when max items are reached', () => {
    for (let i = 0; i < component.maxItems; i++) {
      component.formArray.push(new FormGroup({ power: new FormControl('') }));
    }
    fixture.detectChanges();

    const addButton = fixture.debugElement.query(By.css('a.link'));
    expect(addButton).toBeNull();
  });

  it('should show the add button when less than max items', () => {
    const addButton = fixture.debugElement.query(By.css('a.link'));
    expect(addButton).not.toBeNull();
  });
});
