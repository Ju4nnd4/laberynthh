import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObstacleButton } from './obstacle-button';

describe('ObstacleButton', () => {
  let component: ObstacleButton;
  let fixture: ComponentFixture<ObstacleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObstacleButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ObstacleButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
