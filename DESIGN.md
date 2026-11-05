---
name: InfluencerHub
description: Agentic brand and creator collaboration, where the crew does the legwork and people keep the final say.
colors:
  ink: "#0a1628"
  ink-2: "#12233b"
  ink-3: "#1d3350"
  mint: "#63dd9b"
  mint-soft: "#e7f9ef"
  green: "#065f46"
  sky: "#7cc4ff"
  amber: "#f5b95f"
  amber-soft: "#fff6e5"
  amber-ink: "#8a5a10"
  coral: "#ff8a7a"
  danger: "#991b1b"
  danger-soft: "#fff5f5"
  focus-ring: "#0f9d6b"
  line: "#e3e8ee"
  muted: "#64748b"
  surface: "#ffffff"
  canvas: "#f5f7f9"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontWeight: 300
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "30px"
    fontWeight: 400
  title:
    fontFamily: "Outfit, system-ui, -apple-system, sans-serif"
    fontSize: "18px"
    fontWeight: 600
  body:
    fontFamily: "Outfit, system-ui, -apple-system, sans-serif"
    fontSize: "15px"
    fontWeight: 400
  label:
    fontFamily: "Outfit, system-ui, -apple-system, sans-serif"
    fontSize: "11px"
    letterSpacing: "0.08em"
rounded:
  sm: "8px"
  md: "10px"
  lg: "14px"
  pill: "999px"
spacing:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  button-secondary:
    backgroundColor: "#e5e7eb"
    textColor: "#374151"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  button-mint:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "9px 16px"
  button-mint-hover:
    backgroundColor: "#7ee6ae"
  button-ghost:
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "9px 16px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "20px"
  input:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
  sidebar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    width: "240px"
    padding: "20px"
  skill-chip:
    backgroundColor: "#eef2f6"
    textColor: "#334155"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
---

# Design System: InfluencerHub

## Overview

**Creative North Star: "The Control Room"**

InfluencerHub is a calm place to oversee work being done on your behalf. Deep ink surfaces frame the workspace, light cards hold the work, and colour is kept for status: what is running, what is waiting for you, and what has gone wrong.

The person is the operator, not the audience. Agent steps appear live beside the work, and every decision point stands out from the surfaces around it. The soft serif in headings keeps the room from feeling industrial, and Pip and the named crew give the system a friendly face without loosening its discipline.

Density is moderate. Screens are built for reading evidence and making a decision, not for scanning large tables of numbers.

**Key Characteristics:**
- Ink navy frames with light working surfaces
- Colour reserved for status and primary action
- Flat surfaces separated by hairline borders
- Rings and shadows that signal state
- A soft serif for headings over a clean geometric sans

## Colors

Cool ink neutrals carry the structure, with mint for action on dark surfaces and amber for moments that need a person.

### Primary
- **Deep Ink** (`ink`): The sidebar, landing hero and main text. `ink-2` and `ink-3` are its hover and raised steps on dark surfaces.
- **Signal Mint** (`mint`): Primary actions on ink, and the accent in the logo. Use `mint-soft` for light success or active backgrounds.
- **Forest Green** (`green`): The default button on light surfaces and busy-state text, because mint lacks contrast on white.

### Secondary
- **Gate Amber** (`amber`): The border of an approval gate, with `amber-soft` as its ring. Use `amber-ink` for "needs you" text, because amber itself is too light to read on white.

### Tertiary
- **Sky** (`sky`) and **Coral** (`coral`): Supporting accents, used sparingly.
- **Danger Red** (`danger`): Errors and destructive states, on `danger-soft`. These values are hard-coded today and have no CSS variable yet.

### Neutral
- **Canvas** (`canvas`): The app background behind cards.
- **Surface** (`surface`): Cards, panels and inputs.
- **Hairline** (`line`): Card and panel borders.
- **Slate Muted** (`muted`): Subtitles and secondary text.

### Named Rules
**The Token First Rule.** Use the `:root` variables in `src/styles.css`. Older screens hard-code greys and greens such as #1f7a63, #111827 and #e5e7eb. Treat those as legacy and move them to tokens when a screen is next changed.

**The Amber Means You Rule.** Amber marks a place where the agent has stopped and a person decides. Don't use it for general warnings or decoration.

## Typography

**Display Font:** Fraunces (with Georgia, serif)
**Body Font:** Outfit (with system-ui, -apple-system, sans-serif)

**Character:** A soft, slightly old-style serif gives headings warmth, while the geometric sans keeps evidence, labels and controls plain and quick to read.

### Hierarchy
- **Display** (Fraunces, weight 300): The logo at 22px and the large landing headings.
- **Headline** (Fraunces, weight 400, 30px): Page titles in the app.
- **Title** (Outfit, weight 600, 17–18px): Panel and card headings.
- **Body** (Outfit, weight 400, 14–15px): Evidence, descriptions and form text.
- **Label** (Outfit, 11px, 0.08em tracking, uppercase): Sidebar group labels. Chips and small state text sit at 11.5–12.5px without the uppercase.

### Named Rules
**The Serif Stays Up Top Rule.** Fraunces is for the logo and page-level headings. Panels, cards, controls and data use Outfit.

## Layout

App screens use a fixed 240px ink sidebar beside a scrolling canvas. Agent pages split into the work on the left and a sticky 320px activity column on the right, so live steps stay visible while the person reads. The landing page sits in a 1200px centred container with 24px side padding.

Spacing is hard-coded and mostly falls on 8, 12, 16 and 20px, with 20px as the usual card padding. Breakpoints are also set per component, with 768px and 480px the most common. Below 768px the sidebar becomes an overlay with a backdrop. There is no dark theme.

## Elevation & Depth

The system is flat at rest. Hairline borders and the step from `canvas` to `surface` separate layers, and rings or shadows appear only to communicate state.

### Shadow Vocabulary
- **Gate ring** (`box-shadow: 0 0 0 3px var(--amber-soft)`): An agent is waiting for a decision.
- **Active outline** (`box-shadow: inset 0 0 0 1px var(--ink)`): The selected crew tab.
- **Input focus** (`box-shadow: 0 0 0 3px rgba(99, 221, 155, 0.15)`): A focused field.
- **Modal** (`box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2)`): A dialog above the page.
- **Mobile drawer** (`box-shadow: 4px 0 24px rgba(0, 0, 0, 0.12)`): The open sidebar overlay.

### Named Rules
**The State Earns Depth Rule.** A surface only gains a ring or shadow when something about its state has changed. The resting shadow and hover lift on campaign cards predate this rule and are legacy.

## Shapes

Corners are gently rounded and get larger with the size of the container: 8px for buttons, 10px for inputs and landing buttons, and 14px for cards and panels. Chips and status badges are full pills, and avatars and spinners are circles. Older screens also use 12px and 16px on cards.

## Components

### Buttons
Direct and compact, with no decoration.
- **Shape:** Gently curved (8px), or 10px on the landing page.
- **Primary:** White on Forest Green, set globally on `button`.
- **On ink:** Ink on Signal Mint, lightening on hover.
- **Ghost:** Transparent with a #3a5170 border on ink, moving to a white border on hover.
- **Secondary:** Dark grey on light grey, via `button.secondary`.
- **Focus:** A 2px `focus-ring` outline with a 2px offset, set globally.

### Chips
- **Skill chips:** Small slate pills listing an agent's skills.
- **Status pills:** Tinted pills, such as dark green on pale green for an open campaign.

### Cards / Containers
- **Corner Style:** Softly rounded (14px).
- **Background:** `surface` on `canvas`.
- **Shadow Strategy:** None at rest.
- **Border:** 1px `line`.
- **Internal Padding:** 20px.

### Inputs / Fields
- **Style:** 1px light border, 10px corners and 12px by 14px padding.
- **Focus:** The border turns green with a soft 3px ring.

### Navigation
- **Style:** A 240px ink sidebar with the logo at the top, uppercase group labels and pale links on 10px rounded rows.
- **Mobile:** It becomes an overlay with a backdrop and close button below 768px.

### Approval Gate
The signature component, marking where an agent has stopped and the person decides. It is a card with an amber border, an amber-soft ring and a label, and it holds the proposal with its approve and decline actions.

### Crew Tabs
Cards for choosing an agent, showing the mascot, name and current state. State text turns green while busy and amber-ink when the agent needs you. The active tab gets an ink outline.

### Agent Activity
The live step trace in the sticky right-hand column, which keeps the agent's work visible while the person reads the result.

## Do's and Don'ts

### Do:
- **Do** use the `:root` tokens in `src/styles.css` for new work and when changing older screens.
- **Do** keep amber for approval gates and "needs you" states.
- **Do** use `green` or `amber-ink` for coloured text on light surfaces, because `mint` and `amber` lack the contrast.
- **Do** keep agent activity visible next to the work on agent pages.
- **Do** separate surfaces at rest with a 1px `line` border.

### Don't:
- **Don't** add resting shadows or hover lift to new cards.
- **Don't** add new hard-coded greys or greens when a token covers the role.
- **Don't** use Fraunces inside cards, controls or data.
- **Don't** use amber for general warnings or decoration.
