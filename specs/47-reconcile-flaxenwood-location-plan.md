# Reconcile Cradle of Lament to Flaxenwood Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconcile and replace all references to "Cradle of Lament" with "Flaxenwood" in `data/campaign.yml` using the agent CLI.

**Architecture:**
1. Delete the duplicate `cradle-of-lament` location and update `flaxenwood` description.
2. Update timeline event `evt-cradle-destroyed` with title "Flaxenwood's Fire Dies", `locationId: flaxenwood`, and updated description.
3. Validate data integrity with tests and static build.

**Tech Stack:** TypeScript, Bun, Commander CLI, js-yaml

---

### Task 1: Reconcile Locations in `data/campaign.yml`

**Files:**
- Target: `data/campaign.yml` (via Agent CLI)

- [ ] **Step 1: Delete `cradle-of-lament` location**

Run:
```bash
bun run agent location delete "cradle-of-lament"
```

- [ ] **Step 2: Update `flaxenwood` location description**

Run:
```bash
bun run agent location update "flaxenwood" \
  --description "The home village of the party and Garb whose protection recently failed when its Sacred Pyre was destroyed, plunging the sanctuary into the vulnerability and despair of the encroaching Umbra."
```

- [ ] **Step 3: Verify location list**

Run: `bun run agent location list`
Expected: `cradle-of-lament` is removed; `flaxenwood` is present.

---

### Task 2: Update Timeline Event in `data/campaign.yml`

**Files:**
- Target: `data/campaign.yml` (via Agent CLI)

- [ ] **Step 1: Update `evt-cradle-destroyed` event**

Run:
```bash
bun run agent event update "evt-cradle-destroyed" \
  --title "Flaxenwood's Fire Dies" \
  --locationId "flaxenwood" \
  --description "Just an hour after the earthquake, the Sacred Pyre in Flaxenwood is destroyed, plunging the sanctuary into the vulnerability of the dark."
```

- [ ] **Step 2: Verify event in timeline**

Run: `bun run agent event list`
Expected: Event is updated with Flaxenwood references.

---

### Task 3: Full Verification Suite

**Files:**
- Test: All test files

- [ ] **Step 1: Run tests**

Run: `bun test`
Expected: 25 passing tests.

- [ ] **Step 2: Run linter and build**

Run: `bun run lint && bun run build`
Expected: Clean build with 0 errors.
