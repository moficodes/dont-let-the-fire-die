# 45 - Agent CLI Refinements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine `cli/agent.ts` with reusable helpers (`parseInteger`, `extractTimeFields`), validate integer CLI options, and ensure `event add` defaults time fields safely.

**Architecture:** 
- Add `parseInteger` helper throwing Commander's `InvalidArgumentError` on invalid integer inputs and apply it to all numeric CLI flags.
- Add `extractTimeFields` helper and `DEFAULT_GAME_TIME` constant to DRY up game time parsing.
- Default `event add` time fields to `{ era: "Age of Umbra", year: 0, month: "", day: 1, hour: 0, minute: 0 }` to avoid undefined runtime crashes on the frontend.
- Add tests in `cli/agent.test.ts` covering invalid numeric inputs and default/partial time field additions.

**Tech Stack:** TypeScript, Commander, Bun Test, js-yaml

---

### Task 1: Helper Functions & CLI Option Validation in `cli/agent.ts`

**Files:**
- Modify: `cli/agent.ts`

- [x] **Step 1: Define `parseInteger`, `DEFAULT_GAME_TIME`, and `extractTimeFields`**
  - Import `InvalidArgumentError` from `"commander"`.
  - Implement `parseInteger(val: string): number` checking `Number.isNaN(parsed) || !/^-?\d+$/.test(val.trim())` and throwing `InvalidArgumentError`.
  - Define `DEFAULT_GAME_TIME = { era: "Age of Umbra", year: 0, month: "", day: 1, hour: 0, minute: 0 }`.
  - Implement `extractTimeFields(options: Record<string, any>): Record<string, any>` returning only defined time keys (`era`, `year`, `month`, `day`, `hour`, `minute`).

- [x] **Step 2: Apply `parseInteger` and `extractTimeFields` across `cli/agent.ts`**
  - Update `event add` and `event update` options (`--year`, `--day`, `--hour`, `--minute`) to use `parseInteger`.
  - Update `player add` and `player update` options (`--level`, `--tier`) to use `parseInteger`.
  - Use `extractTimeFields` in `event add` and merge with `DEFAULT_GAME_TIME`.
  - Use `extractTimeFields` in `event update`.

---

### Task 2: Add Comprehensive Tests in `cli/agent.test.ts`

**Files:**
- Modify: `cli/agent.test.ts`

- [x] **Step 1: Add test for `parseInteger` validation failure**
  - Verify `player add` or `event add` with invalid integer (e.g. `--year notanumber` or `--level abc`) exits with non-zero code.

- [x] **Step 2: Add test for `event add` default time fields**
  - Verify adding an event with no `--era`, `--year`, etc. produces default `{ era: "Age of Umbra", year: 0, month: "", day: 1, hour: 0, minute: 0 }`.
  - Verify adding an event with partial time fields (e.g. only `--year 102`) fills in remaining defaults.

- [x] **Step 3: Run test suite**
  - Run `bun test` and ensure all test suites pass.
