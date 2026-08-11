import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PezBusinessCard } from './business-card';

describe('PezBusinessCard', () => {
  let component: PezBusinessCard;
  let fixture: ComponentFixture<PezBusinessCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PezBusinessCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PezBusinessCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
