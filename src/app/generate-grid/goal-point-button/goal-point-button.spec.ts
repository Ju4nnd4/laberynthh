import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalPointButton } from './goal-point-button';

describe('GoalPointButton', () => {
  let component: GoalPointButton;
  let fixture: ComponentFixture<GoalPointButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalPointButton],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalPointButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
