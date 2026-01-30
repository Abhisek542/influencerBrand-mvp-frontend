import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandLayout } from './brand-layout';

describe('BrandLayout', () => {
  let component: BrandLayout;
  let fixture: ComponentFixture<BrandLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
