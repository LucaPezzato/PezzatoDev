import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitKeyboards } from './split-keyboards';

describe('SplitKeyboards', () => {
  let component: SplitKeyboards;
  let fixture: ComponentFixture<SplitKeyboards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitKeyboards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitKeyboards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
