import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftController } from './left-controller';

describe('LeftController', () => {
  let component: LeftController;
  let fixture: ComponentFixture<LeftController>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftController],
    }).compileComponents();

    fixture = TestBed.createComponent(LeftController);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
