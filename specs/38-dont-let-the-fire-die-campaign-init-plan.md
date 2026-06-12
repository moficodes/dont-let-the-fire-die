# Don't Let the Fire Die Campaign Initialization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize the project's single source of truth database with the custom *Don't Let the Fire Die* campaign data and implement 20-hour calendar display support for the *Age of Umbra* setting.

**Architecture:** We will replace the contents of `data/campaign.yml` to seed the campaign's homepage, locations, NPCs, timeline events, and level 3 player characters. We will also update the frontend utility `formatGameTime` in `app/timeline/utils.ts` to properly render the custom 20-hour day format under the *Age of Umbra* era, backed by test coverage in a new test file `app/timeline/utils.test.ts`.

**Tech Stack:** Next.js App Router (RSC), React 19, TypeScript, Bun Test runner, YAML.

---

### Task 1: Update single-source-of-truth campaign database

**Files:**
- Modify: `data/campaign.yml`

- [ ] **Step 1: Replace all template content in `data/campaign.yml` with the custom campaign data**

Overwrite `/Users/mofi/Documents/github.com/moficodes/dont-let-the-fire-die/data/campaign.yml` with the following:

```yaml
home:
  header:
    title: Don't Let the Fire Die
    description: >-
      In a dying world immersed in relentless shadow and nightmarish monsters,
      small communities hold fast to the light, hoping those who endure can find
      a way to save this broken realm before all is lost to darkness.
    navBrand: Death Awaits You!
  nextSession: To Be Scheduled
  lastLocationId: okros
  nextDestinationId: sunken-swamp
  activeQuest:
    title: Search the Sunken Swamp for a blessed branch
    status: active
    locationId: sunken-swamp
    description: >-
      The party must venture north of Okros into the dangerous, mist-choked Sunken
      Swamp to find a Blessed Branch to reignite a Sacred Pyre and bring a point
      of light back to the dark.
  questList:
    - title: Find a Blessed Branch
      status: active
      locationId: sunken-swamp
      description: >-
        Locate a holy, ancient Blessed Branch to allow the light of a Sacred Pyre
        to stand resilient against the Umbra once more.
locations:
  - id: okros
    name: Okros
    region: Idol Hollows
    description: >-
      An emergent fort village standing resilient for over fifty years within the
      swampy flood plains of the mountain-crowned Idol Hollows. Its massive walls
      of melted shields and stone encircle the central Sacred Pyre, whose flames
      serve as a beacon of hope and safety.
  - id: sunken-swamp
    name: Sunken Swamp
    region: Idol Hollows
    description: >-
      A dangerous, mist-choked wetland located north of Okros, filled with
      mutated beasts and terrifying horrors.
  - id: cradle-of-lament
    name: Cradle of Lament
    region: Idol Hollows
    description: >-
      A nearby refuge whose protection recently failed when its Sacred Pyre was
      destroyed.
  - id: shalk-chasm
    name: Shalk Chasm
    region: Idol Hollows
    description: >-
      A massive subterranean sinkhole conjured by a recent seismic event,
      uncovering an expanse of long-buried ruins and a forgotten temple of an
      obscure Veiled God.
  - id: amber-reach
    name: Amber Reach
    region: Griefcleft Mountains
    description: >-
      The fallen and haunted capital city. It houses the Celsian Athenaeum
      stronghold and is contested by the ruthless Damask Queens raider faction.
timeline:
  title: Campaign Timeline
  subtitle: The story so far
  description: Record of our heroes' actions and historical turning points.
  events:
    - id: evt-betrayal
      title: Betrayal of the Gods
      time:
        era: Age of Umbra
        year: 0
        month: Oth-Ascent
        day: 1
        hour: 0
        minute: 0
      type: general
      description: >-
        God-King Othedias betrayed the Pantheon, invoking divine punishment and
        abandonment by the gods, leaving the realm of the Halcyon Domain
        shattered, desolate, and eternally cursed.
    - id: evt-earthquake
      title: Earthquake Unearths Shalk Chasm
      time:
        era: Age of Umbra
        year: 100
        month: Shade-Weave
        day: 8
        hour: 6
        minute: 0
      type: location_change
      locationId: shalk-chasm
      description: >-
        A sudden, massive seismic event rips through the valley, tearing open a
        deep sinkhole known as the Shalk Chasm and exposing long-buried
        structures from the Old World.
    - id: evt-cradle-destroyed
      title: The Cradle's Fire Dies
      time:
        era: Age of Umbra
        year: 100
        month: Shade-Weave
        day: 8
        hour: 7
        minute: 0
      type: drawback
      locationId: cradle-of-lament
      description: >-
        Just an hour after the earthquake, the Sacred Pyre in the Cradle of
        Lament is destroyed, plunging the sanctuary into the vulnerability of the
        dark.
    - id: evt-journey-begins
      title: The Journey Begins
      time:
        era: Age of Umbra
        year: 100
        month: Shade-Weave
        day: 9
        hour: 9
        minute: 0
      type: location_change
      locationId: okros
      description: >-
        The party leaves Okros and starts their journey north toward the Sunken
        Swamp to search for a Blessed Branch to reignite the fading embers of
        hope.
    - id: evt-boar-encounter
      title: The Tentacled Terror
      time:
        era: Age of Umbra
        year: 100
        month: Shade-Weave
        day: 18
        hour: 17
        minute: 0
      type: combat
      locationId: sunken-swamp
      description: >-
        Deep within the marshlands, the party encounters an Umbra-Touched Boar,
        its mouth twisted into thrashing tentacles and extra hands reaching from
        its torso.
players:
  - id: stan-jr
    name: Stan Jr.
    class: Ranger
    level: 3
    ancestry: Ribbet
    community: Wildborne
    subclass: ''
    tier: 1
    image: ''
    description: TBD
    backstory: TBD
    stats:
      agility: 1
      strength: 0
      finesse: 2
      instinct: 1
      presence: -1
      knowledge: 1
    backgroundQuestions: []
    connectionQuestions: []
  - id: zenith
    name: Zenith
    class: Brawler
    level: 3
    ancestry: Clank
    community: Ridgeborne
    subclass: ''
    tier: 1
    image: ''
    description: TBD
    backstory: TBD
    stats:
      agility: -1
      strength: 2
      finesse: 0
      instinct: 1
      presence: 1
      knowledge: 1
    backgroundQuestions: []
    connectionQuestions: []
  - id: fury
    name: Fury
    class: Seraph
    level: 3
    ancestry: Faerie
    community: Underborne
    subclass: ''
    tier: 1
    image: ''
    description: TBD
    backstory: TBD
    stats:
      agility: 1
      strength: -1
      finesse: 1
      instinct: 1
      presence: 2
      knowledge: 0
    backgroundQuestions: []
    connectionQuestions: []
npcs:
  - id: tomas
    name: Tomaś
    role: Fighter
    location: okros
    description: >-
      A young human fighter traveling with Stan Jr.
  - id: biff
    name: Biff
    role: Warrior
    location: okros
    description: >-
      A Drakona warrior traveling with the party. He is a quiet individual of
      very few words.
```

- [ ] **Step 2: Run verification tests to ensure the YAML database complies with the validator**

Run: `bun test cli/schema.test.ts cli/data.test.ts`
Expected: PASS

- [ ] **Step 3: Commit custom campaign data seed**

```bash
git add data/campaign.yml
git commit -m "data: initialize campaign data for Don't Let the Fire Die"
```

---

### Task 2: Implement test-driven 20-hour calendar display support

**Files:**
- Create: `app/timeline/utils.test.ts`
- Modify: `app/timeline/utils.ts`

- [ ] **Step 1: Write the failing test for the custom 20-hour day format under the 'Age of Umbra' era**

Create `/Users/mofi/Documents/github.com/moficodes/dont-let-the-fire-die/app/timeline/utils.test.ts`:

```typescript
import { expect, test, describe } from "bun:test";
import { formatGameTime } from "./utils";
import { GameTime } from "@/types";

describe("formatGameTime", () => {
  test("formats traditional calendar with 12-hour AM/PM", () => {
    const time: GameTime = {
      era: "The Second Age",
      year: 1000,
      month: "Solaris",
      day: 15,
      hour: 14,
      minute: 30,
    };
    expect(formatGameTime(time)).toBe("Solaris 15, 1000 at 2:30 PM");
  });

  test("formats Age of Umbra calendar with 20-hour military/direct time format", () => {
    const time: GameTime = {
      era: "Age of Umbra",
      year: 100,
      month: "Shade-Weave",
      day: 18,
      hour: 17,
      minute: 0,
    };
    expect(formatGameTime(time)).toBe("Shade-Weave 18, 100 - Age of Umbra at 17:00");
  });

  test("formats Age of Umbra midnight hour correctly", () => {
    const time: GameTime = {
      era: "Age of Umbra",
      year: 0,
      month: "Oth-Ascent",
      day: 1,
      hour: 0,
      minute: 0,
    };
    expect(formatGameTime(time)).toBe("Oth-Ascent 1, 0 - Age of Umbra at 00:00");
  });
});
```

- [ ] **Step 2: Run test to verify the new test cases fail**

Run: `bun test app/timeline/utils.test.ts`
Expected: FAIL (Age of Umbra times incorrectly formatted as PM/AM)

- [ ] **Step 3: Implement custom 20-hour hour rendering inside `app/timeline/utils.ts`**

Modify `/Users/mofi/Documents/github.com/moficodes/dont-let-the-fire-die/app/timeline/utils.ts` to implement the new formatting rule for the "Age of Umbra" era:

```typescript
import { TimelineEvent, GameTime } from '@/types';

export function formatGameTime(time: GameTime): string {
  let result = `${time.month} ${time.day}, ${time.year}`;
  if (time.era && time.era !== 'The Second Age') {
    result += ` - ${time.era}`;
  }
  if (time.hour !== undefined && time.minute !== undefined) {
    if (time.era === 'Age of Umbra') {
      const hr = time.hour.toString().padStart(2, '0');
      const min = time.minute.toString().padStart(2, '0');
      result += ` at ${hr}:${min}`;
    } else {
      const period = time.hour >= 12 ? 'PM' : 'AM';
      const hour12 = time.hour % 12 || 12;
      const min = time.minute.toString().padStart(2, '0');
      result += ` at ${hour12}:${min} ${period}`;
    }
  }
  return result;
}

export function filterEvents(
  events: TimelineEvent[],
  filters: {
    type?: string[];
    sagaArc?: string[];
    pcId?: string[];
  }
): TimelineEvent[] {
  return events.filter((event) => {
    // 1. Filter by Type
    if (filters.type && filters.type.length > 0) {
      if (!filters.type.includes(event.type)) return false;
    }

    // 2. Filter by Saga Arc
    if (filters.sagaArc && filters.sagaArc.length > 0) {
      if (!event.sagaArc || !filters.sagaArc.includes(event.sagaArc)) return false;
    }

    // 3. Filter by PC Notes presence
    if (filters.pcId && filters.pcId.length > 0) {
      if (!event.pcNotes || event.pcNotes.length === 0) return false;
      const eventPcIds = event.pcNotes.map((note) => note.pcId);
      const hasMatchingPc = filters.pcId.some((id) => eventPcIds.includes(id));
      if (!hasMatchingPc) return false;
    }

    return true;
  });
}

export function getTypeColor(type: string) {
  switch (type) {
    case 'combat': return { text: 'text-rose-400', bg: 'bg-rose-400/10', dot: 'bg-rose-400', glow: 'shadow-[0_0_12px_rgba(251,113,133,0.4)]' };
    case 'location_change': return { text: 'text-teal-400', bg: 'bg-teal-400/10', dot: 'bg-teal-400', glow: 'shadow-[0_0_12px_rgba(45,212,191,0.4)]' };
    case 'npc_meet': return { text: 'text-indigo-400', bg: 'bg-indigo-400/10', dot: 'bg-indigo-400', glow: 'shadow-[0_0_12px_rgba(129,140,248,0.4)]' };
    case 'achievement': return { text: 'text-amber-400', bg: 'bg-amber-400/10', dot: 'bg-amber-400', glow: 'shadow-[0_0_12px_rgba(251,191,36,0.4)]' };
    case 'drawback': return { text: 'text-stone-400', bg: 'bg-stone-400/10', dot: 'bg-stone-400', glow: 'shadow-[0_0_12px_rgba(168,162,158,0.4)]' };
    default: return { text: 'text-primary', bg: 'bg-primary/10', dot: 'bg-primary', glow: 'shadow-[0_0_12px_rgba(250,192,4,0.4)]' };
  }
}
```

- [ ] **Step 4: Run test to verify they all pass**

Run: `bun test app/timeline/utils.test.ts`
Expected: PASS

- [ ] **Step 5: Run all repository tests to ensure no regressions**

Run: `bun test`
Expected: PASS (All tests passing)

- [ ] **Step 6: Commit custom time formatting support**

```bash
git add app/timeline/utils.ts app/timeline/utils.test.ts
git commit -m "feat: add 20-hour day time formatting support for Age of Umbra era"
```

---

### Task 3: Complete Project Verification & Static Compilation Checks

**Files:**
- N/A (Build verification)

- [ ] **Step 1: Execute project linting**

Run: `bun run lint`
Expected: No errors

- [ ] **Step 2: Compile and build the static Next.js export**

Run: `bun run build`
Expected: Clean static HTML export inside `./out` without compilation/Prerendering errors.

---
