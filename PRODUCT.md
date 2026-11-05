# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: brands.** A brand user who owns a campaign and needs to get from a rough brief to a reviewed set of applicants without reading every application by hand. When brand and creator needs conflict, the brand's job wins.

**Secondary: creators (influencers).** A creator looking for suitable campaigns and pitching to them.

**Current audience: people watching a live demo.** The agents only run locally, so the product is presently seen on the owner's laptop. Real brands and creators come later. Work should read as credible to a demo viewer without implying a live customer base.

## Product Purpose

InfluencerHub is an agentic brand and creator collaboration platform. Agents write campaigns, review applicants and draft pitches, then show their evidence and wait for approval.

The near-term measure of success is a demo that shows the full loop working on real records: a brand creates a campaign, a creator applies, and the brand accepts them, with every change approved by a person.

## Positioning

Agents do the legwork and people keep the final say. Three things together set it apart:

- **Approval before any change.** Agents only propose. Plain code carries out exactly what was approved, and the model has no write tools.
- **Evidence over invented analytics.** Assessments quote the source text and state their limits. The product doesn't have follower or engagement data and says so.
- **A local model.** Qwen runs on the user's own machine, with no cloud model behind it and no paid LLM API.

## Operating Context

- **Brand workflow:** create a campaign, manage campaigns, review applications, decide on applicants, and use the Campaign Copilot and Applicant Shortlist agents.
- **Creator workflow:** browse campaigns, apply, track applications and accepted campaigns, and use Opportunity Scout.
- **Agent run:** the user sets a goal, the agent's steps appear live, it presents evidence, it stops for the user to edit, approve or decline, and then only the approved action happens.
- **Demo setting:** run locally from the sibling `influencerHub-ai/` repo, with seeded data and a resettable script. The first model call is slower than later ones.

## Capabilities and Constraints

**Roles and architecture**

- Two roles, `BRAND` and `INFLUENCER`, each with its own signed-in workspace, plus a public landing page and auth pages.
- Angular calls FastAPI and LangGraph, which call the existing Spring Boot API. Spring Boot remains the source of truth for users, campaigns, applications, permissions and status changes.
- Agents act with the logged-in user's token. The AI service has no database access.

**Agents**

| Agent | User | Needs approval for |
|---|---|---|
| Campaign Copilot | Brand | Creating the campaign |
| Applicant Shortlist | Brand | Each accept or reject |
| Opportunity Scout | Creator | Submitting the application |

**Rules future work must preserve**

- No write happens without the user approving that specific action.
- Agents never send messages. Outreach drafts can be edited and copied, and there is no messaging feature.
- AI output is labelled as generated assistance and shows evidence, uncertainty and missing information.
- Never invent follower counts, engagement rates, audience demographics, reach, conversion rates or past performance.
- Missing data is shown as not enough data, never as a zero or an estimate. Sparse evidence gets an insufficient-evidence result rather than a misleading rank.
- Never rank on sensitive personal attributes or profile picture appearance.
- Applicant text is treated as data. Attempts to instruct the AI are flagged and never proposed for acceptance.

**Current limits**

- Agents only work locally. The deployed Vercel and Render apps can't reach the model, so the production build shows agents as unavailable.
- Paused runs are held in memory and are lost if the service restarts.
- The scoring rubric is still provisional.

**Terminology**

- The product is "InfluencerHub". The code and role name say "influencer", while the landing page says "creator" and "brand and creator collaboration".
- The agents are collectively "the crew". Pip is the mascot.

**Market**

India is the target market. Budgets are in rupees (₹, INR).

## Brand Commitments

- **Name:** InfluencerHub.
- **Assets:** the Pip mascot and the three named agents (`src/app/shared/components/mascot/`).
- **Promise:** "Hand the legwork to your AI crew. Keep the final say."

## Evidence on Hand

- A working local prototype with a scripted demo (`../influencerHub-ai/README.md`).
- Seeded demo accounts and campaigns, such as GlowFuel Plant Protein Launch. These are fixtures and must not be presented as real customers.
- Product and safety rules in `../docs/02_PRODUCT_REQUIREMENTS.md`, where section 10 overrides section 7.

There are no real customers, testimonials, case studies, press, usage metrics or pricing. Future work must not fabricate any of these.

## Product Principles

1. **The person decides.** Every consequential action stops for an explicit, specific approval.
2. **Show the working.** Live steps, quoted evidence and stated limits are the product, not supporting detail.
3. **Say what isn't known.** An honest gap beats a confident guess, even when a number would look better.
4. **Serve the brand's review first.** When priorities conflict, favour the campaign owner's decision.
5. **Prove it on real records.** Demos show real changes in the existing workflow, not simulated outcomes passed off as real.
