import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCampaigns } from './browse-campaigns';

describe('BrowseCampaigns', () => {
  let component: BrowseCampaigns;
  let fixture: ComponentFixture<BrowseCampaigns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseCampaigns]
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
