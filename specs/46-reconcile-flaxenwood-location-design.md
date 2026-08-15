# Design: Reconcile Cradle of Lament to Flaxenwood

## Overview
This specification details consolidating and replacing all references to the party's original village (previously referenced as "Cradle of Lament") with **Flaxenwood** (`id: flaxenwood`) across the campaign dataset.

---

## 1. Location Consolidation

### Remove Location: Cradle of Lament
- Remove entry `id: cradle-of-lament`.

### Update Location: Flaxenwood
- **ID**: `flaxenwood`
- **Name**: `Flaxenwood`
- **Region**: `Idol Hollows`
- **Description**: The home village of the party and Garb whose protection recently failed when its Sacred Pyre was destroyed, plunging the sanctuary into the vulnerability and despair of the encroaching Umbra.

---

## 2. Timeline Events

### Update Event: `evt-cradle-destroyed`
- **ID**: `evt-cradle-destroyed`
- **Title**: `Flaxenwood's Fire Dies`
- **Type**: `drawback`
- **Location ID**: `flaxenwood`
- **Description**: Just an hour after the earthquake, the Sacred Pyre in Flaxenwood is destroyed, plunging the sanctuary into the vulnerability of the dark.

---

## 3. Quests & NPCs
- Ensure all quest references and NPC references point to `Flaxenwood` and `locationId: flaxenwood`.
- Quests:
  - *"Investigate the Okros Refugee Crisis"* (`locationId: okros`): Description mentions Flaxenwood.
  - *"Rekindle the Flaxenwood Sacred Pyre"* (`locationId: flaxenwood`): Title and description reference Flaxenwood.
- NPCs:
  - `garb-firbolg`: Role *"Flaxenwood Refugee"*, description references Flaxenwood.
