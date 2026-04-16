import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightController } from './right-controller';

describe('RightController', () => {
  let component: RightController;
  let fixture: ComponentFixture<RightController>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightController],
    }).compileComponents();

    fixture = TestBed.createComponent(RightController);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
