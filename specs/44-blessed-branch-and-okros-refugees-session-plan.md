# Blessed Branch Retrieval & Okros Refugee Crisis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the campaign data (`data/campaign.yml`) via `cli/agent.ts` with the new lore, location (Flaxenwood), NPCs (Lady of Curiosity, Garb the Firbolg, Tomaś update), timeline events, quests, and home state from the recent session recap.

**Architecture:** 
1. Extend `cli/agent.ts` with CLI options for timestamped events (`--era`, `--year`, `--month`, `--day`, `--hour`, `--minute`, `--locationId`) with unit tests in `cli/agent.test.ts`.
2. Run the agent CLI commands sequentially to populate new entities, update existing ones, update quests, and adjust the home status.
3. Validate campaign data integrity with automated tests.

**Tech Stack:** TypeScript, Bun, Bun Test, Commander, js-yaml

---

### Task 1: Extend Agent CLI Event Command with Timestamps & Location

**Files:**
- Modify: `cli/agent.ts:160-232`
- Test: `cli/agent.test.ts`

- [ ] **Step 1: Write failing test in `cli/agent.test.ts` for `event add` and `event update` timestamp/location options**

Add test to `cli/agent.test.ts`:
```typescript
test("event add and update accept time and locationId options", async () => {
  const result = runAgent(fixture, [
    "event", "add",
    "--id", "evt-test-1",
    "--title", "Test Event",
    "--type", "achievement",
    "--locationId", "okros",
    "--era", "Age of Umbra",
    "--year", "100",
    "--month", "Shade-Weave",
    "--day", "20",
    "--hour", "11",
    "--minute", "30",
    "--description", "A test event description.",
  ]);
  expect(result.status).toBe(0);

  const written = yaml.load(
    await fs.readFile(path.join(fixture, "data/campaign.yml"), "utf8"),
  ) as typeof baseCampaign;
  const evt = (written.timeline.events as any[]).find((e) => e.id === "evt-test-1");
  expect(evt).toBeDefined();
  expect(evt.locationId).toBe("okros");
  expect(evt.type).toBe("achievement");
  expect(evt.time).toEqual({
    era: "Age of Umbra",
    year: 100,
    month: "Shade-Weave",
    day: 20,
    hour: 11,
    minute: 30,
  });

  await cleanupFixture(fixture);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test cli/agent.test.ts`
Expected: FAIL (or missing time fields on evt)

- [ ] **Step 3: Update `cli/agent.ts` to support timestamp and location flags**

Update `event.command("add")` and `event.command("update")` in `cli/agent.ts`:
```typescript
event.command("add")
  .requiredOption("--id <string>", "Event ID")
  .requiredOption("--title <string>", "Event Title")
  .option("--type <string>", "Event Type")
  .option("--description <string>", "Event Description")
  .option("--locationId <string>", "Location ID")
  .option("--era <string>", "Era")
  .option("--year <number>", "Year", parseInt)
  .option("--month <string>", "Month")
  .option("--day <number>", "Day", parseInt)
  .option("--hour <number>", "Hour", parseInt)
  .option("--minute <number>", "Minute", parseInt)
  .action(async (options) => {
    try {
      const data = await readCampaign(CAMPAIGN_FILE);
      if (data.timeline.events.some((e: any) => e.id === options.id)) {
        console.error(`Event with id ${options.id} already exists.`);
        process.exit(1);
      }

      const newEvent: any = {
        id: options.id,
        title: options.title,
        type: options.type || "general",
        description: options.description || "",
      };

      if (options.locationId) newEvent.locationId = options.locationId;

      if (options.era || options.year !== undefined || options.month || options.day !== undefined) {
        newEvent.time = {
          era: options.era || "Age of Umbra",
          year: options.year !== undefined ? options.year : 0,
          month: options.month || "",
          day: options.day !== undefined ? options.day : 1,
          hour: options.hour !== undefined ? options.hour : 0,
          minute: options.minute !== undefined ? options.minute : 0,
        };
      }

      data.timeline.events.push(newEvent);
      await writeCampaign(data, CAMPAIGN_FILE);
      console.log(`Added Event: ${options.title}`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });

event.command("update")
  .argument("<id>", "Event ID")
  .option("--title <string>")
  .option("--type <string>")
  .option("--description <string>")
  .option("--locationId <string>")
  .option("--era <string>")
  .option("--year <number>", "Year", parseInt)
  .option("--month <string>")
  .option("--day <number>", "Day", parseInt)
  .option("--hour <number>", "Hour", parseInt)
  .option("--minute <number>", "Minute", parseInt)
  .action(async (id, options) => {
    try {
      const data = await readCampaign(CAMPAIGN_FILE);
      const index = data.timeline.events.findIndex((e: any) => e.id === id);
      if (index === -1) {
        console.error(`Event with id ${id} not found.`);
        process.exit(1);
      }

      const current = data.timeline.events[index];
      if (options.title) current.title = options.title;
      if (options.type) current.type = options.type;
      if (options.description) current.description = options.description;
      if (options.locationId) current.locationId = options.locationId;

      if (options.era || options.year !== undefined || options.month || options.day !== undefined || options.hour !== undefined || options.minute !== undefined) {
        current.time = {
          era: options.era !== undefined ? options.era : (current.time?.era || "Age of Umbra"),
          year: options.year !== undefined ? options.year : (current.time?.year ?? 0),
          month: options.month !== undefined ? options.month : (current.time?.month || ""),
          day: options.day !== undefined ? options.day : (current.time?.day ?? 1),
          hour: options.hour !== undefined ? options.hour : (current.time?.hour ?? 0),
          minute: options.minute !== undefined ? options.minute : (current.time?.minute ?? 0),
        };
      }

      data.timeline.events[index] = current;
      await writeCampaign(data, CAMPAIGN_FILE);
      console.log(`Updated Event: ${id}`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test cli/agent.test.ts`
Expected: PASS

---

### Task 2: Add Location (Flaxenwood)

**Files:**
- Target: `data/campaign.yml` (via Agent CLI)

- [ ] **Step 1: Execute agent CLI command to add Flaxenwood**

Run:
```bash
bun run agent location add \
  --id "flaxenwood" \
  --name "Flaxenwood" \
  --region "Idol Hollows" \
  --description "The home village of the party and Garb, currently facing darkness and despair without a burning Sacred Pyre to ward off the encroaching Umbra."
```

- [ ] **Step 2: Verify location exists in campaign data**

Run: `bun run agent location list`
Expected: Output contains `{"id": "flaxenwood", "name": "Flaxenwood"}`

---

### Task 3: Add and Update NPCs

**Files:**
- Target: `data/campaign.yml` (via Agent CLI)

- [ ] **Step 1: Add Lady of Curiosity**

Run:
```bash
bun run agent npc add \
  --id "lady-of-curiosity" \
  --name "Lady of Curiosity" \
  --role "Information & Head Collector" \
  --location "sunken-swamp" \
  --description "An enigmatic and macabre Clank who traverses the Umbra carrying a staff stacked with severed heads. She collects knowledge and secrets, formed a curious bond with Zenith, and revealed that Tomaś possesses Celestial blood."
```

- [ ] **Step 2: Add Garb (Firbolg)**

Run:
```bash
bun run agent npc add \
  --id "garb-firbolg" \
  --name "Garb" \
  --role "Flaxenwood Refugee" \
  --location "okros" \
  --description "A grief-stricken Firbolg villager from Flaxenwood stranded outside the gates of Okros after losing his son during the grueling trek across the wastes."
```

- [ ] **Step 3: Update Tomaś with Celestial revelation**

Run:
```bash
bun run agent npc update "tomas" \
  --description "A young human fighter traveling with the party, recently revealed by the Lady of Curiosity to be of Celestial descent—a heritage he was previously unaware of."
```

- [ ] **Step 4: Verify NPCs in campaign data**

Run: `bun run agent npc list`
Expected: Output includes `lady-of-curiosity` and `garb-firbolg`.

---

### Task 4: Add Timeline Events

**Files:**
- Target: `data/campaign.yml` (via Agent CLI)

- [ ] **Step 1: Add Event: The Lady of Curiosity**

Run:
```bash
bun run agent event add \
  --id "evt-lady-of-curiosity" \
  --title "The Lady of Curiosity" \
  --era "Age of Umbra" \
  --year 100 \
  --month "Shade-Weave" \
  --day 19 \
  --hour 14 \
  --minute 0 \
  --type "npc_meet" \
  --locationId "sunken-swamp" \
  --description "While resting in an open grove surrounded by mindlessly circling horrors, the party encounters the Lady of Curiosity—a Clank carrying a staff stacked with heads. Zenith persuades her to spare them, though she claims she will collect their heads in death, and identifies Tomaś as a Celestial."
```

- [ ] **Step 2: Add Event: Claiming the Blessed Branch**

Run:
```bash
bun run agent event add \
  --id "evt-blessed-branch" \
  --title "Claiming the Blessed Branch" \
  --era "Age of Umbra" \
  --year 100 \
  --month "Shade-Weave" \
  --day 20 \
  --hour 11 \
  --minute 0 \
  --type "achievement" \
  --locationId "sunken-swamp" \
  --description "Deep within a hollowed-out ancient tree, the party secures the Blessed Branch. When a being of thousands of hands grapples Fury, she uses the branch's divine energy to heal it, receiving a vision of a terrified young religious leader from the Old World. Zenith also witnesses a vision of Celestials perishing during the gods' abandonment."
```

- [ ] **Step 3: Add Event: Turmoil at the Gates of Okros**

Run:
```bash
bun run agent event add \
  --id "evt-okros-refugees" \
  --title "Turmoil at the Gates of Okros" \
  --era "Age of Umbra" \
  --year 100 \
  --month "Shade-Weave" \
  --day 21 \
  --hour 18 \
  --minute 0 \
  --type "drawback" \
  --locationId "okros" \
  --description "Returning to Okros after a day and a half of travel, the party discovers a sprawling refugee camp outside the walls. They meet Garb, a Firbolg from Flaxenwood who lost his son on the journey. With the city locked down and turned away refugees, shouts of \"Open the gates!\" erupt from within."
```

- [ ] **Step 4: Verify timeline events in campaign data**

Run: `bun run agent event list`
Expected: Output includes all 3 newly added events.

---

### Task 5: Update Quests & Home Configuration

**Files:**
- Target: `data/campaign.yml` (via Agent CLI)

- [ ] **Step 1: Mark completed quest status in questList**

Run:
```bash
bun run agent quest update "Find a Blessed Branch" --status "completed"
```

- [ ] **Step 2: Add new quests to questList**

Run:
```bash
bun run agent quest add \
  --title "Investigate the Okros Refugee Crisis" \
  --status "active" \
  --locationId "okros" \
  --description "Discover why refugees from surrounding settlements like Flaxenwood are flooding Okros and why the city gates have been sealed."

bun run agent quest add \
  --title "Rekindle the Flaxenwood Sacred Pyre" \
  --status "pending" \
  --locationId "flaxenwood" \
  --description "Journey back to Flaxenwood with the retrieved Blessed Branch to ignite a new Sacred Pyre and protect the settlement."
```

- [ ] **Step 3: Update home state and active quest**

Run:
```bash
bun run agent home update \
  --lastLocationId "sunken-swamp" \
  --nextDestinationId "okros"
```

Also update active quest directly:
```bash
bun run agent quest update "Search the Sunken Swamp for a blessed branch" \
  --status "completed"
```

- [ ] **Step 4: Verify quests with quest list**

Run: `bun run agent quest list`
Expected: Output displays active and list quests properly.

---

### Task 6: Full Verification Suite

**Files:**
- Test: All tests in repo

- [ ] **Step 1: Run complete test suite**

Run: `bun test`
Expected: 100% tests pass.

- [ ] **Step 2: Run linter and build checks**

Run: `bun run lint` & `bun run build`
Expected: Clean build without errors or warnings.
