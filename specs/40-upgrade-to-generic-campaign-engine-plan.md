# Spec: 40 - Upgrade to Generic Campaign Engine and Theme Presets Plan

This document details the plan to merge upstream updates from the `sablewood-chronicles` template repository into our customized **Don't Let the Fire Die** campaign repository, resolving any file conflicts and ensuring complete data and functional preservation.

## 1. Goal
Merge upstream template features (Dynamic themes, generic game system engine, CLI Wizard, and improved TS interfaces) into our repo while preserving our custom campaign details and 20-hour calendar format.

## 2. File Status and Conflict Prevention

Upstream has added several new files:
*   `lib/systems/` (registry and specs)
*   `lib/themes.ts`
*   `cli/init-campaign.ts`

Upstream has modified files that conflict with our changes:
*   `types/index.ts` (Upstream added setting types; we have no custom local changes to this file, so it can be merged directly).
*   `app/layout.tsx` (Upstream added dynamic font/theme inject; we have no custom local changes to this file, so it can be merged directly).
*   `app/timeline/utils.ts` (Conflict: Upstream kept 12-hour AM/PM formatting; we added custom 20-hour formatting under 'Age of Umbra').
*   `data/campaign.yml` (Conflict: Upstream updated template with empty settings; we replaced it with 'Don't Let the Fire Die' custom campaign).
*   `package.json` (Upstream added minor package updates).

## 3. Step-by-Step Action Plan

1.  **Perform Git Merge**:
    *   Merge `upstream/main` into `main` using `--allow-unrelated-histories`.
    *   This will trigger conflicts in:
        *   `app/timeline/utils.ts`
        *   `data/campaign.yml`
        *   `specs/37-...` / `specs/38-...` (We will discard upstream's 37/38 files in favor of our own files to avoid confusing the local plan records, or rename them if appropriate. To be safe, we keep both sets of spec numbers since our specs are 37-init and 38-init, and theirs are 37-generic and 38-generic. We'll rename our specs to `37-dont-let-the-fire-die-init-design.md` or keep them as is since their filenames are different!).
        *   Wait, let's check: upstream's 37 and 38 filenames are `37-generic-campaign-engine-design.md` and `38-generic-campaign-engine-plan.md`. Our filenames are `37-dont-let-the-fire-die-campaign-init-design.md` and `38-dont-let-the-fire-die-campaign-init-plan.md`. Since the filenames are completely different, there is **no file name conflict** for the spec documents! They will both happily coexist in `specs/`! That's wonderful.

2.  **Resolve conflicts**:
    *   `app/timeline/utils.ts`: Keep our custom 20-hour day formatting logic.
    *   `data/campaign.yml`: Merge our custom campaign data with the new `settings` block at the top of the file.
        *   Our settings should be:
            ```yaml
            settings:
              gameSystem: daggerheart
              themePreset: fantasy-parchment
            ```
            (We can keep these settings so it perfectly preserves our Daggerheart system and fantasy-parchment aesthetic!).
    *   `app/timeline/utils.test.ts`: Restore our test suite file if the merge deletes it or conflicts.

3.  **Run Tests and Build Verification**:
    *   Install new dependencies (if any).
    *   Run `bun test` to make sure all 12 tests pass.
    *   Run `bun run build` to verify Next.js builds successfully.
