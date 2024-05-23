import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesLayoutComponent } from './heroes-layout.component';

describe('HeroesLayoutComponent', () => {
  let component: HeroesLayoutComponent;
  let fixture: ComponentFixture<HeroesLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesLayoutComponent]
    });
    fixture = TestBed.createComponent(HeroesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
