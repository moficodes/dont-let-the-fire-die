import { expect, test, beforeEach, afterAll } from "bun:test";
import { spawnSync } from "child_process";
import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";

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
