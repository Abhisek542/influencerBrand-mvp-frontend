import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { InfluencerLayout } from './influencer-layout';

describe('InfluencerLayout', () => {
  let component: InfluencerLayout;
  let fixture: ComponentFixture<InfluencerLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfluencerLayout],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfluencerLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
