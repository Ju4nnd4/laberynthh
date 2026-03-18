import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterPointButton } from './starter-point-button';

describe('StarterPointButton', () => {
  let component: StarterPointButton;
  let fixture: ComponentFixture<StarterPointButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarterPointButton],
    }).compileComponents();

    fixture = TestBed.createComponent(StarterPointButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
