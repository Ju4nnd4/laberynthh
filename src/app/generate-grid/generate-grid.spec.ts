import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateGrid } from './generate-grid';

describe('GenerateGrid', () => {
  let component: GenerateGrid;
  let fixture: ComponentFixture<GenerateGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
