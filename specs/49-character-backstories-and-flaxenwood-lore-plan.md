# Character Backstories, Key NPCs, and Flaxenwood Demographics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update `data/campaign.yml` with Flaxenwood demographics, 6 new NPCs, and PC backstory/description updates via the Agent CLI (`cli/agent.ts`).

**Architecture:**
1. Update `flaxenwood` location description with surface and subterranean population details.
2. Add 6 new NPCs (`stanley`, `syzl`, `willow`, `orion`, `nyx`, `wanda`) with `bun run agent npc add`.
3. Update PCs `stan-jr`, `zenith`, `fury` descriptions and backstories with `bun run agent player update`.
4. Run full test suite and build verification.

**Tech Stack:** TypeScript, Bun, Bun Test, Commander CLI, js-yaml

---

### Task 1: Update Location Demographics (Flaxenwood)

**Files:**
- Target: `data/campaign.yml` (via Agent CLI)

- [ ] **Step 1: Update Flaxenwood location description**

Run:
```bash
bun run agent location update "flaxenwood" \
  --description "The home settlement of the party and Garb, consisting of roughly 500 surface villagers alongside a thriving Underborne community of approximately 500 fairies dwelling in the cave networks directly beneath the town. The village is currently plunged into vulnerability following the loss of its Sacred Pyre."
```

- [ ] **Step 2: Verify location list**

Run: `bun run agent location list`
Expected: `flaxenwood` updated.

---

### Task 2: Add New NPCs

**Files:**
- Target: `data/campaign.yml` (via Agent CLI)

- [ ] **Step 1: Add Stanley**

Run:
```bash
bun run agent npc add \
  --id "stanley" \
  --name "Stanley" \
  --role "Human Lorekeeper & Foster Father" \
  --location "flaxenwood" \
  --description "A wise human lorekeeper residing in Flaxenwood who took in Stan Jr. as an orphaned child at a very young age, raising and mentoring him as a loving father figure."
```

- [ ] **Step 2: Add Syzl**

Run:
```bash
bun run agent npc add \
  --id "syzl" \
  --name "Syzl" \
  --role "Okros Militia Leader" \
  --location "okros" \
  --description "A stern Drakona leader in the Okros militia who had a hostile altercation with Stan Jr. and the party as they passed through Okros on their search for the Blessed Branch."
```

- [ ] **Step 3: Add Willow**

Run:
```bash
bun run agent npc add \
  --id "willow" \
  --name "Willow" \
  --role "Elven Rescuer & Companion" \
  --location "flaxenwood" \
  --description "An elf who discovered Zenith nearly 100 years ago during the Betrayal of the Gods when Zenith first awakened to consciousness and sentience."
```

- [ ] **Step 4: Add Orion**

Run:
```bash
bun run agent npc add \
  --id "orion" \
  --name "Orion" \
  --role "Metalworks Master" \
  --location "okros" \
  --description "A Clank who oversees the forge and metalworks in Okros. Awakened 100 years ago during the gods' departure like Zenith, sharing the profound, unspoken kinship common to all Clanks."
```

- [ ] **Step 5: Add Nyx**

Run:
```bash
bun run agent npc add \
  --id "nyx" \
  --name "Nyx" \
  --role "Faerie Witch & Underborne Matriarch" \
  --location "flaxenwood" \
  --description "A venerable faerie witch, lorekeeper, and matriarch of the 500-strong Underborne faerie colony dwelling in the caves beneath Flaxenwood. She served as a mother and grandmother figure to Fury, imparting deep worldly lore and ancient wisdom."
```

- [ ] **Step 6: Add Wanda**

Run:
```bash
bun run agent npc add \
  --id "wanda" \
  --name "Wanda" \
  --role "Underborne Faerie" \
  --location "flaxenwood" \
  --description "A faerie belonging to the subterranean Underborne community beneath Flaxenwood, known to Fury."
```

- [ ] **Step 7: Verify NPC list**

Run: `bun run agent npc list`
Expected: All 6 new NPCs listed.

---

### Task 3: Update Player Descriptions & Backstories

**Files:**
- Target: `data/campaign.yml` (via Agent CLI)

- [ ] **Step 1: Update Stan Jr.**

Run:
```bash
bun run agent player update "stan-jr" \
  --description "A loyal and vigilant Ribbet Ranger of Flaxenwood, raised from infancy by the village's human lorekeeper Stanley." \
  --backstory "Found as an orphaned child and taken in by Stanley, Stan Jr. grew up protecting Flaxenwood and learning the wild ways of the Idol Hollows. His straightforward demeanor led to a bitter clash with the Drakona militia leader Syzl during the party's passage through Okros."
```

- [ ] **Step 2: Update Zenith**

Run:
```bash
bun run agent player update "zenith" \
  --description "A stalwart Clank Brawler who awakened to sentience a century ago during the divine abandonment." \
  --backstory "Gained consciousness 100 years ago when the gods departed the mortal realm, found and guided in his early existence by the elf Willow. Zenith shares the deep instinctual kinship of all awakened Clanks—including Orion of Okros—while repeatedly fending off fanatical zealots bearing the symbol of the Shattered Sun who seek to eradicate all relics of the divine era."
```

- [ ] **Step 3: Update Fury**

Run:
```bash
bun run agent player update "fury" \
  --description "A devoted Faerie Seraph born in the Underborne cavern settlement beneath Flaxenwood." \
  --backstory "Raised in the subterranean cave network beneath Flaxenwood among 500 fellow fairies under the maternal guidance of the witch matriarch Nyx. Imbued with sacred lore and light, Fury ventures above to rekindle hope for both the surface dwellers and her underground kin."
```

- [ ] **Step 4: Verify Player list**

Run: `bun run agent player list`
Expected: All 3 players updated.

---

### Task 4: Full Verification Suite

**Files:**
- Test: All test suites

- [ ] **Step 1: Run tests**

Run: `bun test`
Expected: 25 pass, 0 fail.

- [ ] **Step 2: Run linter and build checks**

Run: `bun run lint && bun run build`
Expected: 0 errors, clean static generation of player and NPC pages.
