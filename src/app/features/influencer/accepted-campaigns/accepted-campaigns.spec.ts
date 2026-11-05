import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { AcceptedCampaigns } from './accepted-campaigns';

describe('AcceptedCampaigns', () => {
  let component: AcceptedCampaigns;
  let fixture: ComponentFixture<AcceptedCampaigns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptedCampaigns],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedCampaigns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
