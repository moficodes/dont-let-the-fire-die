# Okros Midnight Council & Ambushed Escape Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update `data/campaign.yml` with the Okros narrative progression, including new NPC Elder Akadona, updated descriptions for Syzl, Orion, Biff, Tomaś, and Okros, two new timeline events, and quest updates via the Agent CLI (`cli/agent.ts`).

**Architecture:** Use the existing Sablewood Agent CLI (`bun run agent`) to execute atomic data updates across NPCs, locations, timeline events, and quests, maintaining schema consistency and automatic backups. Finish by running the automated test suite and Next.js production build verification.

**Tech Stack:** TypeScript, Bun, Bun Test, Next.js, Commander CLI, js-yaml

---

### Task 1: Add and Update NPCs

**Files:**
- Target: `data/campaign.yml` (via Agent CLI)
- Test: `bun test cli/data.test.ts`

- [x] **Step 1: Add Elder Akadona**

Run:
```bash
bun run agent npc add \
  --id "elder-akadona" \
  --name "Elder Akadona" \
  --role "Town Elder & Council Leader" \
  --location "okros" \
  --description "A venerable female orc elder over 120 years old who leads the governing council of Okros. Frail of body and relying on a walking stick, she chose transparency and reason over violence, resisting council hardliners who demanded seizing the party's Blessed Branch by force."
```
Expected output:
```
Added NPC: Elder Akadona
```

- [x] **Step 2: Update Syzl**

Run:
```bash
bun run agent npc update "syzl" \
  --role "Okros Militia Leader" \
  --location "okros" \
  --description "A stern, battle-weary Drakona commander of the Okros militia. Facing severe overcrowding from 4,000+ refugees and the strain of defending the walls, he admitted the party after spotting the Blessed Branch's glow. Correctly anticipating the party would flee rather than surrender the branch, he placed rooftop snipers above the church garden and blocked their escape with his guards."
```
Expected output:
```
Updated NPC: syzl
```

- [x] **Step 3: Update Orion**

Run:
```bash
bun run agent npc update "orion" \
  --role "Metalworks Master & Council Member" \
  --location "okros" \
  --description "A Clank who awakened to sentience 100 years ago during the divine abandonment, now overseeing the Okros forge and sitting on the town council. Sharing an unspoken kinship with Zenith, he walked Zenith to the central pyre to plead the plight of 4,000+ refugees and proposed igniting a second Sacred Pyre in Okros using the Blessed Branch."
```
Expected output:
```
Updated NPC: orion
```

- [x] **Step 4: Update Biff**

Run:
```bash
bun run agent npc update "biff" \
  --location "okros" \
  --description "A skittish human rogue who aids the party. Deciding he and Tomaś would be liabilities in the dangerous trek back to Flaxenwood, the party left him in the church garden, where he discreetly scavenged church supplies to prepare for whatever comes next."
```
Expected output:
```
Updated NPC: biff
```

- [x] **Step 5: Update Tomaś**

Run:
```bash
bun run agent npc update "tomas" \
  --location "okros" \
  --description "A young human fighter of hidden Celestial heritage. Deemed too vulnerable for the perilous return journey to Flaxenwood, he was left sheltered in the quiet sanctuary of the church back garden in Okros alongside Biff."
```
Expected output:
```
Updated NPC: tomas
```

- [x] **Step 6: Verify NPC list**

Run:
```bash
bun run agent npc list
```
Expected output includes `elder-akadona`, `syzl`, `orion`, `biff`, `tomas`.

---

### Task 2: Update Okros Location Details

**Files:**
- Target: `data/campaign.yml` (via Agent CLI)
- Test: `bun test cli/data.test.ts`

- [x] **Step 1: Update Okros description**

Run:
```bash
bun run agent location update "okros" \
  --description "An emergent fortified town of melted shields and stone built around a central Sacred Pyre. Typically home to 2,500–3,000 residents, the collapse of surrounding village pyres has flooded Okros with over 4,000 refugees residing in dense tent encampments inside the walls and outside both eastern and western gates. The hillside church serves as weekly worship space, emergency council chamber, and crisis operations center."
```
Expected output:
```
Updated Location: okros
```

- [x] **Step 2: Verify location list**

Run:
```bash
bun run agent location list
```
Expected output includes `okros`.

---

### Task 3: Add Timeline Events

**Files:**
- Target: `data/campaign.yml` (via Agent CLI)
- Test: `bun test app/timeline/utils.test.ts`

- [x] **Step 1: Add Event - The Midnight Council at Okros**

Run:
```bash
bun run agent event add \
  --id "evt-okros-midnight-council" \
  --title "The Midnight Council at Okros" \
  --type "npc_meet" \
  --locationId "okros" \
  --era "Age of Umbra" \
  --year 100 \
  --month "Shade-Weave" \
  --day 21 \
  --hour 19 \
  --minute 0 \
  --description "Syzl admits the party through the gates after spotting the Blessed Branch's beacon-like glow across the wastes. Passing sprawling refugee tent cities, the party is escorted to the hillside church where the council remains assembled near midnight. Orion takes Zenith toward the central pyre, explaining that Okros's 2,500-capacity infrastructure is collapsing under 4,000+ refugees, proposing a second sacred pyre in Okros. Simultaneously, Elder Akadona privately informs Stan Jr. and Fury that council hardliners favored taking the branch by force, leaving the moral burden of saving the refugees in the party's hands."
```
Expected output:
```
Added Event: The Midnight Council at Okros
```

- [x] **Step 2: Add Event - Dawn Ambush at the Church Garden**

Run:
```bash
bun run agent event add \
  --id "evt-church-garden-ambush" \
  --title "Dawn Ambush at the Church Garden" \
  --type "combat" \
  --locationId "okros" \
  --era "Age of Umbra" \
  --year 100 \
  --month "Shade-Weave" \
  --day 22 \
  --hour 6 \
  --minute 0 \
  --description "Resting in the church garden, the party resolves to return to Flaxenwood to rescue survivors before committing the branch, leaving Tomaś and Biff behind in safety while Biff scours the church for supplies. Anticipating the council's hostility if they refuse to relinquish the branch, the party sneaks out at dawn. However, Syzl anticipated their flight, positioning rooftop guards on adjacent buildings. As Stan Jr. and Zenith attempt to break out on foot, Syzl and his militia confront them, while Fury takes flight above the church clutching the glowing Blessed Branch."
```
Expected output:
```
Added Event: Dawn Ambush at the Church Garden
```

---

### Task 4: Update Quests and Home State

**Files:**
- Target: `data/campaign.yml` (via Agent CLI)
- Test: `bun test cli/data.test.ts`

- [x] **Step 1: Mark Investigate Refugee Crisis as completed**

Run:
```bash
bun run agent quest update "Investigate the Okros Refugee Crisis" \
  --status "completed"
```
Expected output:
```
Updated Quest: Investigate the Okros Refugee Crisis
```

- [x] **Step 2: Add New Quest - Escape the Okros Ambush**

Run:
```bash
bun run agent quest add \
  --title "Escape the Okros Ambush" \
  --status "active" \
  --locationId "okros" \
  --description "Break through Syzl's militia encirclement at the hillside church garden and safely escape the fortified town of Okros with the Blessed Branch."
```
Expected output:
```
Added Quest: Escape the Okros Ambush
```

- [x] **Step 3: Activate Escape the Okros Ambush**

Run:
```bash
bun run agent quest activate "Escape the Okros Ambush"
```
Expected output:
```
Activated Quest: Escape the Okros Ambush
```

- [x] **Step 4: Add New Pending Quest - Flaxenwood Relief Expedition**

Run:
```bash
bun run agent quest add \
  --title "Flaxenwood Relief Expedition" \
  --status "pending" \
  --locationId "flaxenwood" \
  --description "Journey back to Flaxenwood through the Umbra to locate survivors, bring them back to Okros, or rekindle Flaxenwood's Sacred Pyre if the situation is dire."
```
Expected output:
```
Added Quest: Flaxenwood Relief Expedition
```

- [x] **Step 5: Update Home destination**

Run:
```bash
bun run agent home update \
  --lastLocationId "okros" \
  --nextDestinationId "flaxenwood"
```
Expected output:
```
Home configuration updated successfully.
```

---

### Task 5: Full Verification and Build

**Files:**
- Target: Whole repository

- [x] **Step 1: Run project unit tests**

Run: `bun test`
Expected: 25+ tests pass, 0 fail.

- [x] **Step 2: Run production Next.js build**

Run: `bun run build`
Expected: Static page generation succeeds with 0 errors.

- [x] **Step 3: Run linter**

Run: `bun run lint`
Expected: 0 errors.
