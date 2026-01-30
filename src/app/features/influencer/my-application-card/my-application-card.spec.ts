import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApplicationCard } from './my-application-card';

describe('MyApplicationCard', () => {
  let component: MyApplicationCard;
  let fixture: ComponentFixture<MyApplicationCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyApplicationCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyApplicationCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
