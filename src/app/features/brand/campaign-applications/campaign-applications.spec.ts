import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { CampaignApplications } from './campaign-applications';

describe('CampaignApplications', () => {
  let component: CampaignApplications;
  let fixture: ComponentFixture<CampaignApplications>;
  let http: HttpTestingController;

  const LIST = /\/api\/brand\/applications\/7$/;
  const FORBIDDEN = { status: 403, statusText: 'Forbidden' };
  const DENIED_AS_TEXT = '{"status":403,"message":"Access denied","path":"/x"}';

  const application = (status: string) => ({
    id: 1,
    status,
    influencerName: 'Influencer',
    niche: 'Tech',
    platform: 'Instagram',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignApplications],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['id', '7']]) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignApplications);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    http.verify();
  });

  function text(): string {
    return (fixture.nativeElement as HTMLElement).textContent ?? '';
  }

  function button(label: string): HTMLButtonElement {
    const found = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === label
    );
    if (!found) {
      throw new Error(`No "${label}" button`);
    }
    return found;
  }

  function loadWith(status: string): void {
    http.expectOne((r) => LIST.test(r.url)).flush([application(status)]);
  }

  function statusRequest(status: string) {
    return http.expectOne((r) => r.url.endsWith(`/api/brand/applications/1/status?status=${status}`));
  }

  it.each([
    ['Accept', 'ACCEPTED', 'Accepted'],
    ['Reject', 'REJECTED', 'Rejected'],
  ])('%s updates the badge on success', (label, status, badge) => {
    loadWith('PENDING');
    button(label).click();

    statusRequest(status).flush(`Appication ${status} sucessfully`);

    expect(component.applications[0].status).toBe(status);
    expect(text()).toContain(badge);
  });

  it.each([
    ['Accept', 'ACCEPTED'],
    ['Reject', 'REJECTED'],
  ])('%s shows an error, keeps PENDING and offers no success state on 403', (label, status) => {
    loadWith('PENDING');
    button(label).click();

    statusRequest(status).flush(DENIED_AS_TEXT, FORBIDDEN);

    expect(component.applications[0].status).toBe('PENDING');
    expect(text()).toContain('Access denied');
    expect(text()).toContain('Pending');
    expect(text()).not.toContain('{"status"');
    expect(button('Accept')).toBeTruthy();
  });

  it('clears a previous error when the next action succeeds', () => {
    loadWith('PENDING');
    button('Accept').click();
    statusRequest('ACCEPTED').flush(DENIED_AS_TEXT, FORBIDDEN);
    expect(text()).toContain('Access denied');

    button('Accept').click();
    statusRequest('ACCEPTED').flush('ok');

    expect(text()).not.toContain('Access denied');
  });

  it('removes an application from the list when delete succeeds', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    loadWith('REJECTED');
    button('Delete').click();

    http.expectOne((r) => r.url.endsWith('/api/brand/applications/1/deleted')).flush('deleted');

    expect(component.applications).toEqual([]);
  });

  it('keeps the application and shows an error when delete gets 403', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    loadWith('REJECTED');
    button('Delete').click();

    http.expectOne((r) => r.url.endsWith('/api/brand/applications/1/deleted')).flush(DENIED_AS_TEXT, FORBIDDEN);

    expect(component.applications.length).toBe(1);
    expect(text()).toContain('Access denied');
  });

  it('shows the error, not the spinner or an empty list, when loading gets 404', () => {
    http
      .expectOne((r) => LIST.test(r.url))
      .flush({ status: 404, message: 'Campaign not found' }, { status: 404, statusText: 'Not Found' });

    expect(text()).toContain('Campaign not found');
    expect(text()).not.toContain('Loading applications');
    expect(text()).not.toContain('No Applications Yet');
  });
});
