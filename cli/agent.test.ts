import { expect, test, beforeEach, afterAll, describe } from "bun:test";
import { spawnSync } from "child_process";
import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import { parseInteger, extractTimeFields, DEFAULT_GAME_TIME } from "./agent";
import { InvalidArgumentError } from "commander";

// Tests run the agent CLI as a subprocess against a temp campaign file.
// We use a temporary cwd so CAMPAIGN_FILE (which is process.cwd() + data/campaign.yml)
// points into our fixture.

const REPO_ROOT = path.resolve(__dirname, "..");

async function setupFixture(seed: object): Promise<string> {
  const tmpDir = await fs.mkdtemp(path.join(REPO_ROOT, ".agent-test-"));
  await fs.mkdir(path.join(tmpDir, "data"));
  await fs.writeFile(
    path.join(tmpDir, "data", "campaign.yml"),
    yaml.dump(seed),
    "utf8",
  );
  return tmpDir;
}

async function cleanupFixture(tmpDir: string): Promise<void> {
  await fs.rm(tmpDir, { recursive: true, force: true });
}

function runAgent(cwd: string, args: string[]) {
  return spawnSync("bun", ["run", path.join(REPO_ROOT, "cli/agent.ts"), ...args], {
    cwd,
    encoding: "utf8",
  });
}

const baseCampaign = {
  home: {
    header: { title: "T", description: "D", navBrand: "N" },
  },
  locations: [],
  timeline: { title: "T", subtitle: "S", description: "D", events: [] },
  players: [],
  npcs: [
    { id: "elder", name: "Elder Maeve", role: "elder", location: "hush", description: "wise" },
  ],
};

let fixture: string;

beforeEach(async () => {
  fixture = await setupFixture(baseCampaign);
});

afterAll(async () => {
  // Best-effort cleanup of any stragglers
  const entries = await fs.readdir(REPO_ROOT);
  for (const e of entries) {
    if (e.startsWith(".agent-test-")) {
      await fs.rm(path.join(REPO_ROOT, e), { recursive: true, force: true }).catch(() => {});
    }
  }
});

test("player update accepts all scalar player fields", async () => {
  // Add a player to the fixture first
  const seed = {
    ...baseCampaign,
    players: [
      {
        id: "orna",
        name: "Orna Kaan",
        class: "Sorcerer",
        level: 1,
        ancestry: "",
        community: "",
        subclass: "",
        tier: 1,
        image: "",
        description: "",
        backstory: "",
        stats: { agility: 0, strength: 0, finesse: 0, instinct: 0, presence: 0, knowledge: 0 },
        backgroundQuestions: [],
        connectionQuestions: [],
      },
    ],
  };
  const localFixture = await setupFixture(seed);

  const result = runAgent(localFixture, [
    "player", "update", "orna",
    "--ancestry", "Galapa",
    "--community", "Loreborn",
    "--subclass", "Primal Origin",
    "--tier", "2",
    "--image", "/images/orna.webp",
    "--description", "A wise sorcerer.",
    "--backstory", "She was raised by turtles.",
  ]);
  expect(result.status).toBe(0);

  const written = yaml.load(
    await fs.readFile(path.join(localFixture, "data/campaign.yml"), "utf8"),
  ) as typeof seed;
  const orna = written.players.find((p) => p.id === "orna") as any;
  expect(orna.ancestry).toBe("Galapa");
  expect(orna.community).toBe("Loreborn");
  expect(orna.subclass).toBe("Primal Origin");
  expect(orna.tier).toBe(2);
  expect(orna.image).toBe("/images/orna.webp");
  expect(orna.description).toBe("A wise sorcerer.");
  expect(orna.backstory).toBe("She was raised by turtles.");
  // Existing fields preserved
  expect(orna.name).toBe("Orna Kaan");
  expect(orna.class).toBe("Sorcerer");

  await cleanupFixture(localFixture);
});

test("npc update accepts --image and --attitudeTowardParty", async () => {
  const result = runAgent(fixture, [
    "npc", "update", "elder",
    "--image", "/images/elder.webp",
    "--attitudeTowardParty", "friendly",
  ]);
  expect(result.status).toBe(0);

  const written = yaml.load(
    await fs.readFile(path.join(fixture, "data/campaign.yml"), "utf8"),
  ) as typeof baseCampaign;
  const elder = written.npcs.find((n) => n.id === "elder") as any;
  expect(elder.image).toBe("/images/elder.webp");
  expect(elder.attitudeTowardParty).toBe("friendly");
  // Existing fields preserved
  expect(elder.role).toBe("elder");

  await cleanupFixture(fixture);
});

test("event add accepts time options and locationId", async () => {
  const result = runAgent(fixture, [
    "event", "add",
    "--id", "evt-test-1",
    "--title", "The Great Fall",
    "--type", "combat",
    "--description", "A momentous battle took place.",
    "--locationId", "loc-sunken-swamp",
    "--era", "Age of Umbra",
    "--year", "105",
    "--month", "Shade-Weave",
    "--day", "12",
    "--hour", "14",
    "--minute", "30",
  ]);
  expect(result.status).toBe(0);

  const written = yaml.load(
    await fs.readFile(path.join(fixture, "data/campaign.yml"), "utf8"),
  ) as typeof baseCampaign;
  const evt = written.timeline.events.find((e: any) => e.id === "evt-test-1") as any;
  expect(evt).toBeDefined();
  expect(evt.title).toBe("The Great Fall");
  expect(evt.type).toBe("combat");
  expect(evt.description).toBe("A momentous battle took place.");
  expect(evt.locationId).toBe("loc-sunken-swamp");
  expect(evt.time).toEqual({
    era: "Age of Umbra",
    year: 105,
    month: "Shade-Weave",
    day: 12,
    hour: 14,
    minute: 30,
  });
  expect(evt.era).toBeUndefined();
  expect(evt.year).toBeUndefined();
  expect(evt.month).toBeUndefined();
  expect(evt.day).toBeUndefined();
  expect(evt.hour).toBeUndefined();
  expect(evt.minute).toBeUndefined();
});

test("event update accepts time options and locationId", async () => {
  const seed = {
    ...baseCampaign,
    timeline: {
      ...baseCampaign.timeline,
      events: [
        {
          id: "evt-existing",
          title: "Initial Event",
          type: "general",
          description: "Initial description",
          locationId: "loc-initial",
          time: {
            era: "Age of Umbra",
            year: 100,
            month: "Oth-Ascent",
            day: 1,
            hour: 0,
            minute: 0,
          },
        },
      ],
    },
  };
  const localFixture = await setupFixture(seed);

  const result = runAgent(localFixture, [
    "event", "update", "evt-existing",
    "--title", "Updated Event Title",
    "--locationId", "loc-updated",
    "--era", "Age of Light",
    "--year", "101",
    "--month", "Bloom-Rise",
    "--day", "15",
    "--hour", "8",
    "--minute", "45",
  ]);
  expect(result.status).toBe(0);

  const written = yaml.load(
    await fs.readFile(path.join(localFixture, "data/campaign.yml"), "utf8"),
  ) as typeof seed;
  const evt = written.timeline.events.find((e: any) => e.id === "evt-existing") as any;
  expect(evt).toBeDefined();
  expect(evt.title).toBe("Updated Event Title");
  expect(evt.type).toBe("general");
  expect(evt.description).toBe("Initial description");
  expect(evt.locationId).toBe("loc-updated");
  expect(evt.time).toEqual({
    era: "Age of Light",
    year: 101,
    month: "Bloom-Rise",
    day: 15,
    hour: 8,
    minute: 45,
  });
  expect(evt.era).toBeUndefined();
  expect(evt.year).toBeUndefined();

  await cleanupFixture(localFixture);
});

test("event update preserves existing time fields when only some time fields are updated", async () => {
  const seed = {
    ...baseCampaign,
    timeline: {
      ...baseCampaign.timeline,
      events: [
        {
          id: "evt-partial",
          title: "Partial Event",
          type: "general",
          description: "Initial description",
          time: {
            era: "Age of Umbra",
            year: 100,
            month: "Oth-Ascent",
            day: 1,
            hour: 0,
            minute: 0,
          },
        },
      ],
    },
  };
  const localFixture = await setupFixture(seed);

  const result = runAgent(localFixture, [
    "event", "update", "evt-partial",
    "--day", "20",
    "--hour", "18",
  ]);
  expect(result.status).toBe(0);

  const written = yaml.load(
    await fs.readFile(path.join(localFixture, "data/campaign.yml"), "utf8"),
  ) as typeof seed;
  const evt = written.timeline.events.find((e: any) => e.id === "evt-partial") as any;
  expect(evt.time).toEqual({
    era: "Age of Umbra",
    year: 100,
    month: "Oth-Ascent",
    day: 20,
    hour: 18,
    minute: 0,
  });

  await cleanupFixture(localFixture);
});

describe("helpers", () => {
  test("parseInteger parses valid integers", () => {
    expect(parseInteger("42")).toBe(42);
    expect(parseInteger("0")).toBe(0);
    expect(parseInteger("-5")).toBe(-5);
  });

  test("parseInteger throws InvalidArgumentError on invalid integers", () => {
    expect(() => parseInteger("abc")).toThrow(InvalidArgumentError);
    expect(() => parseInteger("12.34")).toThrow(InvalidArgumentError);
    expect(() => parseInteger("")).toThrow(InvalidArgumentError);
    expect(() => parseInteger("42abc")).toThrow(InvalidArgumentError);
  });

  test("extractTimeFields extracts only defined time properties", () => {
    const fields = extractTimeFields({
      title: "Title",
      era: "Age of Umbra",
      year: 100,
      extra: "ignore",
    });
    expect(fields).toEqual({
      era: "Age of Umbra",
      year: 100,
    });
  });
});

test("event add assigns default time fields when omitted", async () => {
  const result = runAgent(fixture, [
    "event", "add",
    "--id", "evt-defaults",
    "--title", "Default Time Event",
  ]);
  expect(result.status).toBe(0);

  const written = yaml.load(
    await fs.readFile(path.join(fixture, "data/campaign.yml"), "utf8"),
  ) as typeof baseCampaign;
  const evt = written.timeline.events.find((e: any) => e.id === "evt-defaults") as any;
  expect(evt).toBeDefined();
  expect(evt.time).toEqual(DEFAULT_GAME_TIME);
});

test("event add fills in default time fields when partially provided", async () => {
  const result = runAgent(fixture, [
    "event", "add",
    "--id", "evt-partial-add",
    "--title", "Partial Add Event",
    "--year", "102",
    "--day", "5",
  ]);
  expect(result.status).toBe(0);

  const written = yaml.load(
    await fs.readFile(path.join(fixture, "data/campaign.yml"), "utf8"),
  ) as typeof baseCampaign;
  const evt = written.timeline.events.find((e: any) => e.id === "evt-partial-add") as any;
  expect(evt).toBeDefined();
  expect(evt.time).toEqual({
    era: "Age of Umbra",
    year: 102,
    month: "",
    day: 5,
    hour: 0,
    minute: 0,
  });
});

test("CLI rejects invalid integer options with non-zero exit code", async () => {
  const resultEvent = runAgent(fixture, [
    "event", "add",
    "--id", "evt-invalid",
    "--title", "Invalid Event",
    "--year", "not-a-number",
  ]);
  expect(resultEvent.status).not.toBe(0);

  const resultPlayer = runAgent(fixture, [
    "player", "add",
    "--id", "player-invalid",
    "--name", "Invalid Player",
    "--level", "not-a-number",
  ]);
  expect(resultPlayer.status).not.toBe(0);
});

test("quest activate sets activeQuest and updates status in questList", async () => {
  const seed = {
    ...baseCampaign,
    home: {
      ...baseCampaign.home,
      activeQuest: {
        title: "Old Active Quest",
        status: "active",
        locationId: "loc-old",
        description: "Old quest description",
      },
      questList: [
        {
          title: "New Target Quest",
          status: "pending",
          locationId: "loc-new",
          description: "New target quest description",
        },
      ],
    },
  };
  const localFixture = await setupFixture(seed);

  const result = runAgent(localFixture, ["quest", "activate", "New Target Quest"]);
  expect(result.status).toBe(0);

  const written = yaml.load(
    await fs.readFile(path.join(localFixture, "data/campaign.yml"), "utf8"),
  ) as typeof seed;

  expect(written.home.activeQuest).toEqual({
    title: "New Target Quest",
    status: "active",
    locationId: "loc-new",
    description: "New target quest description",
  });

  const updatedInList = written.home.questList?.find((q) => q.title === "New Target Quest");
  expect(updatedInList?.status).toBe("active");

  await cleanupFixture(localFixture);
});

test("quest activate fails when quest does not exist in questList", async () => {
  const seed = {
    ...baseCampaign,
    home: {
      ...baseCampaign.home,
      questList: [
        {
          title: "Existing Quest",
          status: "pending",
          locationId: "loc-1",
        },
      ],
    },
  };
  const localFixture = await setupFixture(seed);

  const result = runAgent(localFixture, ["quest", "activate", "Nonexistent Quest"]);
  expect(result.status).not.toBe(0);

  await cleanupFixture(localFixture);
});



