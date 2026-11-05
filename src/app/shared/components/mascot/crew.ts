import { MascotTone } from './mascot';

export interface CrewAgent {
  id: 'shortlist' | 'copilot' | 'scout';
  name: string;
  forWho: 'Brands' | 'Creators';
  tone: MascotTone;
  summary: string;
  skills: string[];
  asksBefore: string;
}

/** Everything listed here is something the agent service does today. */
export const CREW: CrewAgent[] = [
  {
    id: 'copilot',
    name: 'Campaign Copilot',
    forWho: 'Brands',
    tone: 'sky',
    summary: 'Turns a rough brief into a ready campaign, and asks about anything missing.',
    skills: ['Read a brief', 'Ask follow-ups', 'Find budget and deadline', 'Draft the campaign'],
    asksBefore: 'creating the campaign',
  },
  {
    id: 'shortlist',
    name: 'Applicant Shortlist',
    forWho: 'Brands',
    tone: 'mint',
    summary: 'Ranks pending applicants, and quotes the evidence behind every score.',
    skills: ['Score applicants', 'Quote evidence', 'Flag injection attempts', 'Draft outreach'],
    asksBefore: 'each accept or reject',
  },
  {
    id: 'scout',
    name: 'Opportunity Scout',
    forWho: 'Creators',
    tone: 'amber',
    summary: 'Finds open campaigns that suit your profile and drafts your pitch.',
    skills: ['Read your profile', 'Match open campaigns', 'Explain the fit', 'Draft a pitch'],
    asksBefore: 'submitting the application',
  },
];

export function crewAgent(id: CrewAgent['id']): CrewAgent {
  return CREW.find((agent) => agent.id === id)!;
}
