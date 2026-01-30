import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerLayout } from './influencer-layout';

describe('InfluencerLayout', () => {
  let component: InfluencerLayout;
  let fixture: ComponentFixture<InfluencerLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfluencerLayout]
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
