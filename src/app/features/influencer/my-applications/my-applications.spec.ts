import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { MyApplications } from './my-applications';

describe('MyApplications', () => {
  let component: MyApplications;
  let fixture: ComponentFixture<MyApplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyApplications],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyApplications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
