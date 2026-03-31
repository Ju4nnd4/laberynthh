import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPanel } from './grid-panel';

describe('GridPanel', () => {
  let component: GridPanel;
  let fixture: ComponentFixture<GridPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(GridPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
