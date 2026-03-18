import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindButton } from './find-button';

describe('FindButton', () => {
  let component: FindButton;
  let fixture: ComponentFixture<FindButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindButton],
    }).compileComponents();

    fixture = TestBed.createComponent(FindButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
