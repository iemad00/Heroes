import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayInputComponent } from './form-array-input.component';

describe('FormArrayInputComponent', () => {
  let component: FormArrayInputComponent;
  let fixture: ComponentFixture<FormArrayInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormArrayInputComponent]
    });
    fixture = TestBed.createComponent(FormArrayInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
