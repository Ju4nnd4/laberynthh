import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRowColumn } from './input-row-column';

describe('InputRowColumn', () => {
  let component: InputRowColumn;
  let fixture: ComponentFixture<InputRowColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputRowColumn],
    }).compileComponents();

    fixture = TestBed.createComponent(InputRowColumn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
