import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedCampaigns } from './accepted-campaigns';

describe('AcceptedCampaigns', () => {
  let component: AcceptedCampaigns;
  let fixture: ComponentFixture<AcceptedCampaigns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptedCampaigns]
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
