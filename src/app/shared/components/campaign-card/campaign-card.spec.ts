import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCard } from './campaign-card';

describe('CampaignCard', () => {
  let component: CampaignCard;
  let fixture: ComponentFixture<CampaignCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
