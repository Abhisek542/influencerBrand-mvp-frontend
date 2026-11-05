import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { BrowseCampaigns } from './browse-campaigns';

describe('BrowseCampaigns', () => {
  let component: BrowseCampaigns;
  let fixture: ComponentFixture<BrowseCampaigns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseCampaigns],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseCampaigns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
