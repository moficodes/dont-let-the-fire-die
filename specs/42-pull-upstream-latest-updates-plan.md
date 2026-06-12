# Spec: 42 - Pull Upstream Immersive Themes and Visuals Plan

This document details the plan to merge the latest upstream template updates (immersive card mutations, dynamic dividers, and hover interactions) into our customized **Don't Let the Fire Die** campaign repository.

## 1. Goal
Merge upstream template updates from `upstream/main` (commits up to `1fed7af`) into our repository, preserving our custom campaign data, custom 20-hour calendar, and settings block.

## 2. Merging and Conflict Resolution

*   **Perform Git Merge**:
    *   Merge `upstream/main` into `main`.
*   **Conflict Handling**:
    *   If any conflicts arise in files like `app/layout.tsx` or styling files, we will inspect them and resolve them cleanly.

## 3. Verification

*   Verify all 14 tests pass using `bun test`.
*   Verify static compilation build works successfully using `bun run build`.
