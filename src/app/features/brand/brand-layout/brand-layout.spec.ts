import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { BrandLayout } from './brand-layout';

describe('BrandLayout', () => {
  let component: BrandLayout;
  let fixture: ComponentFixture<BrandLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandLayout],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
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
