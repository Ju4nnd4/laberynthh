import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridButton } from './grid-button';

describe('GridButton', () => {
  let component: GridButton;
  let fixture: ComponentFixture<GridButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridButton],
    }).compileComponents();

    fixture = TestBed.createComponent(GridButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
