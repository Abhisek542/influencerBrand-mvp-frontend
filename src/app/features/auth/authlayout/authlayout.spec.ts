import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';

import { Authlayout } from './authlayout';

describe('Authlayout', () => {
  let component: Authlayout;
  let fixture: ComponentFixture<Authlayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Authlayout],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Authlayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
