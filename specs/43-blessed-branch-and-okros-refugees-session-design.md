# Design: Blessed Branch Retrieval & Okros Refugee Crisis Session Update

## Overview
This specification details the lore, entities, events, quests, and CLI tooling updates resulting from the party's expedition into the Sunken Swamp, discovery of the Blessed Branch, encounters with the Lady of Curiosity and the Many-Handed Guardian, and return to the sealed gates of Okros.

---

## 1. Entities to Add & Update

### Location: Flaxenwood
- **ID**: `flaxenwood`
- **Name**: `Flaxenwood`
- **Region**: `Idol Hollows`
- **Description**: The home village of the party and Garb, currently facing darkness and despair without a burning Sacred Pyre to ward off the encroaching Umbra.

### NPC: Lady of Curiosity (New)
- **ID**: `lady-of-curiosity`
- **Name**: `Lady of Curiosity`
- **Role**: `Information & Head Collector`
- **Location**: `sunken-swamp`
- **Description**: An enigmatic and macabre Clank who traverses the Umbra carrying a staff stacked with severed heads. She collects knowledge and secrets, formed a curious bond with Zenith, and revealed that Tomaś possesses Celestial blood.

### NPC: Garb (New)
- **ID**: `garb-firbolg`
- **Name**: `Garb`
- **Role**: `Flaxenwood Refugee`
- **Location**: `okros`
- **Description**: A grief-stricken Firbolg villager from Flaxenwood stranded outside the gates of Okros after losing his son during the grueling trek across the wastes.

### NPC: Tomaś (Update)
- **ID**: `tomas`
- **Description**: A young human fighter traveling with the party, recently revealed by the Lady of Curiosity to be of Celestial descent—a heritage he was previously unaware of.

---

## 2. Timeline Events

### Event 1: The Lady of Curiosity
- **ID**: `evt-lady-of-curiosity`
- **Title**: `The Lady of Curiosity`
- **Time**:
  - Era: `Age of Umbra`
  - Year: `100`
  - Month: `Shade-Weave`
  - Day: `19`
  - Hour: `14`
  - Minute: `0`
- **Type**: `npc_meet`
- **Location ID**: `sunken-swamp`
- **Description**: While resting in an open grove surrounded by mindlessly circling horrors, the party encounters the Lady of Curiosity—a Clank carrying a staff stacked with heads. Zenith persuades her to spare them, though she claims she will collect their heads in death, and identifies Tomaś as a Celestial.

### Event 2: Claiming the Blessed Branch
- **ID**: `evt-blessed-branch`
- **Title**: `Claiming the Blessed Branch`
- **Time**:
  - Era: `Age of Umbra`
  - Year: `100`
  - Month: `Shade-Weave`
  - Day: `20`
  - Hour: `11`
  - Minute: `0`
- **Type**: `achievement`
- **Location ID**: `sunken-swamp`
- **Description**: Deep within a hollowed-out ancient tree, the party secures the Blessed Branch. When a being of thousands of hands grapples Fury, she uses the branch's divine energy to heal it, receiving a vision of a terrified young religious leader from the Old World. Zenith also witnesses a vision of Celestials perishing during the gods' abandonment.

### Event 3: Turmoil at the Gates of Okros
- **ID**: `evt-okros-refugees`
- **Title**: `Turmoil at the Gates of Okros`
- **Time**:
  - Era: `Age of Umbra`
  - Year: `100`
  - Month: `Shade-Weave`
  - Day: `21`
  - Hour: `18`
  - Minute: `0`
- **Type**: `drawback`
- **Location ID**: `okros`
- **Description**: Returning to Okros after a day and a half of travel, the party discovers a sprawling refugee camp outside the walls. They meet Garb, a Firbolg from Flaxenwood who lost his son on the journey. With the city locked down and turned away refugees, shouts of "Open the gates!" erupt from within.

---

## 3. Quests & Home Configuration

### Quest Updates
- **Existing Active Quest**: Update *"Search the Sunken Swamp for a blessed branch"* status to `completed`.
- **Existing Quest in Quest List**: Update *"Find a Blessed Branch"* status to `completed`.
- **New Active Quest**:
  - **Title**: `Investigate the Okros Refugee Crisis`
  - **Status**: `active`
  - **Location ID**: `okros`
  - **Description**: Discover why refugees from surrounding settlements like Flaxenwood are flooding Okros and why the city gates have been sealed.
- **New Pending Quest**:
  - **Title**: `Rekindle the Flaxenwood Sacred Pyre`
  - **Status**: `pending`
  - **Location ID**: `flaxenwood`
  - **Description**: Journey back to Flaxenwood with the retrieved Blessed Branch to ignite a new Sacred Pyre and protect the settlement.

### Home State
- `lastLocationId`: `sunken-swamp`
- `nextDestinationId`: `okros`
- `activeQuest`: `Investigate the Okros Refugee Crisis`

---

## 4. Agent CLI Enhancements (`cli/agent.ts`)
To adhere to the `sablewood-agent-cli` rule, data updates must be run through `bun run agent`. To support timestamped timeline events, `cli/agent.ts` will be updated to support:
- `--era <string>`
- `--year <number>`
- `--month <string>`
- `--day <number>`
- `--hour <number>`
- `--minute <number>`
- `--locationId <string>`
on the `event add` and `event update` commands.
