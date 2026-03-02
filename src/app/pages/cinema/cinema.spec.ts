import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cinema } from './cinema';

describe('Cinema', () => {
  let component: Cinema;
  let fixture: ComponentFixture<Cinema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cinema]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cinema);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
