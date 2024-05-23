import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisrerComponent } from './regisrer.component';

describe('RegisrerComponent', () => {
  let component: RegisrerComponent;
  let fixture: ComponentFixture<RegisrerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisrerComponent]
    });
    fixture = TestBed.createComponent(RegisrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
