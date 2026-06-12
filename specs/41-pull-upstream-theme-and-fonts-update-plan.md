# Spec: 41 - Pull Upstream Theme and Fonts Update Plan

This document details the plan to merge the latest upstream template updates (atmospheric themes, custom fonts, unique typography pairings) into our customized **Don't Let the Fire Die** campaign repository.

## 1. Goal
Merge upstream template updates from `upstream/main` (commits up to `ea5ae95`) into our repository, preserving our custom campaign data, custom 20-hour calendar, and settings block.

## 2. Merging and Conflict Resolution

*   **Perform Git Merge**:
    *   Merge `upstream/main` into `main`.
    *   This should be a clean fast-forward or standard merge since we just merged and resolved unrelated histories, meaning we now have a shared commit history with the upstream!
*   **Conflict Handling**:
    *   If any conflicts arise in files like `lib/themes.ts` or `app/layout.tsx`, we will inspect them and resolve them, ensuring both our local custom changes and upstream's font mapping are preserved.

## 3. Verification

*   Verify all 14 tests pass using `bun test`.
*   Verify static compilation build works successfully using `bun run build`.
