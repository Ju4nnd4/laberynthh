import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateGridButton } from './generate-grid-button';

describe('GenerateGridButton', () => {
  let component: GenerateGridButton;
  let fixture: ComponentFixture<GenerateGridButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateGridButton],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateGridButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
