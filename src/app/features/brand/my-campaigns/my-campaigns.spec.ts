import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { MyCampaigns } from './my-campaigns';

describe('MyCampaigns', () => {
  let component: MyCampaigns;
  let fixture: ComponentFixture<MyCampaigns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCampaigns],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCampaigns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
