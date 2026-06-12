# Spec: 37 - Don't Let the Fire Die Campaign Initialization Design

This document details the design specifications for transitioning the `Sablewood Chronicles` template into the customized **Don't Let the Fire Die** campaign setting (Matthew Mercer's *The Age of Umbra*).

## 1. Core Identity & Homepage Config

*   **Title**: `Don't Let the Fire Die`
*   **Nav Brand**: `Death Awaits You!`
*   **Description**: `In a dying world immersed in relentless shadow and nightmarish monsters, small communities hold fast to the light, hoping those who endure can find a way to save this broken realm before all is lost to darkness.`
*   **Next Session**: `To Be Scheduled`
*   **Journey Status**:
    *   `lastLocationId`: `okros`
    *   `nextDestinationId`: `sunken-swamp`
*   **Active Quest (Main Objective)**:
    *   `title`: `Search the Sunken Swamp for a blessed branch`
    *   `locationId`: `sunken-swamp`
    *   `description`: `The party must venture north of Okros into the dangerous, mist-choked Sunken Swamp to find a Blessed Branch to reignite a Sacred Pyre and bring a point of light back to the dark.`
*   **Quest List (Notice Board)**:
    *   `title`: `Find a Blessed Branch`
        `status`: `active`
        `locationId`: `sunken-swamp`
        `description`: `Locate a holy, ancient Blessed Branch to allow the light of a Sacred Pyre to stand resilient against the Umbra once more.`

---

## 2. The Custom Halcyon Calendar

The campaign tracks time under a customized 20-hour, 6-day, 10-month, 313-day year structure.

*   **Era**: `Age of Umbra`
*   **Hours/Day**: `20`
*   **Days/Week**: `6`
    1.  *Dawnday*
    2.  *Gloomday*
    3.  *Pyreday*
    4.  *Ashday*
    5.  *Weaveday*
    6.  *Sunderday*
*   **Days/Year**: `313`
*   **Months**:
    1.  *Oth-Ascent* (31 days)
    2.  *Vellum* (31 days)
    3.  *Marrow-Mist* (31 days)
    4.  *Shade-Weave* (31 days)
    5.  *Rot-Swamp* (31 days)
    6.  *Tallow* (31 days)
    7.  *Sorrow-Moon* (31 days)
    8.  *Pyre-Keep* (32 days)
    9.  *Gloom-Zenith* (32 days)
    10. *Ashen-Grave* (32 days)
    *Math confirmation: (7 months * 31 days) + (3 months * 32 days) = 217 + 96 = 313 days.*

---

## 3. Key Locations & NPCs

### Locations

1.  **Okros** (`okros`)
    *   **Region**: `Idol Hollows`
    *   **Description**: `An emergent fort village standing resilient for over fifty years within the swampy flood plains of the mountain-crowned Idol Hollows. Its massive walls of melted shields and stone encircle the central Sacred Pyre, whose flames serve as a beacon of hope and safety.`
2.  **Sunken Swamp** (`sunken-swamp`)
    *   **Region**: `Idol Hollows`
    *   **Description**: `A dangerous, mist-choked wetland located north of Okros, filled with mutated beasts and terrifying horrors.`
3.  **Cradle of Lament** (`cradle-of-lament`)
    *   **Region**: `Idol Hollows`
    *   **Description**: `A nearby refuge whose protection recently failed when its Sacred Pyre was destroyed.`
4.  **Shalk Chasm** (`shalk-chasm`)
    *   **Region**: `Idol Hollows`
    *   **Description**: `A massive subterranean sinkhole conjured by a recent seismic event, uncovering an expanse of long-buried ruins and a forgotten temple of an obscure Veiled God.`
5.  **Amber Reach** (`amber-reach`)
    *   **Region**: `Griefcleft Mountains`
    *   **Description**: `The fallen and haunted capital city. It houses the Celsian Athenaeum stronghold and is contested by the ruthless Damask Queens raider faction.`

### NPCs

1.  **Tomaś** (`tomas`)
    *   **Role**: `Fighter`
    *   **Location**: `okros`
    *   **Description**: `A young human fighter traveling with Stan Jr.`
2.  **Biff** (`biff`)
    *   **Role**: `Warrior`
    *   **Location**: `okros`
    *   **Description**: `A Drakona warrior traveling with the party. He is a quiet individual of very few words.`

---

## 4. Timeline Events

1.  **evt-betrayal**
    *   **Title**: `Betrayal of the Gods`
    *   **Time**: `{ era: "Age of Umbra", year: 0, month: "Oth-Ascent", day: 1, hour: 0, minute: 0 }`
    *   **Type**: `general`
    *   **Description**: `God-King Othedias betrayed the Pantheon, invoking divine punishment and abandonment by the gods, leaving the realm of the Halcyon Domain shattered and eternally cursed.`
2.  **evt-earthquake**
    *   **Title**: `Earthquake Unearths Shalk Chasm`
    *   **Time**: `{ era: "Age of Umbra", year: 100, month: "Shade-Weave", day: 8, hour: 6, minute: 0 }`
    *   **Type**: `location_change`
    *   **LocationId**: `shalk-chasm`
    *   **Description**: `A sudden, massive seismic event rips through the valley, tearing open a deep sinkhole known as the Shalk Chasm and exposing long-buried structures from the Old World.`
3.  **evt-cradle-destroyed**
    *   **Title**: `The Cradle's Fire Dies`
    *   **Time**: `{ era: "Age of Umbra", year: 100, month: "Shade-Weave", day: 8, hour: 7, minute: 0 }`
    *   **Type**: `drawback`
    *   **LocationId**: `cradle-of-lament`
    *   **Description**: `Just an hour after the earthquake, the Sacred Pyre in the Cradle of Lament is destroyed, plunging the sanctuary into the vulnerability of the dark.`
4.  **evt-journey-begins**
    *   **Title**: `The Journey Begins`
    *   **Time**: `{ era: "Age of Umbra", year: 100, month: "Shade-Weave", day: 9, hour: 9, minute: 0 }`
    *   **Type**: `location_change`
    *   **LocationId**: `okros`
    *   **Description**: `The party leaves Okros and starts their journey north toward the Sunken Swamp to search for a Blessed Branch to reignite the fading embers of hope.`
5.  **evt-boar-encounter**
    *   **Title**: `The Tentacled Terror`
    *   **Time**: `{ era: "Age of Umbra", year: 100, month: "Shade-Weave", day: 18, hour: 17, minute: 0 }`
    *   **Type**: `combat`
    *   **LocationId**: `sunken-swamp`
    *   **Description**: `Deep within the marshlands, the party encounters an Umbra-Touched Boar, its mouth twisted into thrashing tentacles and extra hands reaching from its torso.`

---

## 5. Player Characters (PCs)

All PCs start at **Level 3, Tier 1** with customized starting stats. Descriptions are marked `TBD` for now.

1.  **Stan Jr.** (`stan-jr`)
    *   **Class**: `Ranger`
    *   **Ancestry**: `Ribbet`
    *   **Community**: `Wildborne`
    *   **Level**: `3`
    *   **Tier**: `1`
    *   **Stats**: `{ agility: 1, strength: 0, finesse: 2, instinct: 1, presence: -1, knowledge: 1 }`
    *   **Description**: `TBD`
    *   **Backstory**: `TBD`
2.  **Zenith** (`zenith`)
    *   **Class**: `Brawler`
    *   **Ancestry**: `Clank`
    *   **Community**: `Ridgeborne`
    *   **Level**: `3`
    *   **Tier**: `1`
    *   **Stats**: `{ agility: -1, strength: 2, finesse: 0, instinct: 1, presence: 1, knowledge: 1 }`
    *   **Description**: `TBD`
    *   **Backstory**: `TBD`
3.  **Fury** (`fury`)
    *   **Class**: `Seraph`
    *   **Ancestry**: `Faerie`
    *   **Community**: `Underborne`
    *   **Level**: `3`
    *   **Tier**: `1`
    *   **Stats**: `{ agility: 1, strength: -1, finesse: 1, instinct: 1, presence: 2, knowledge: 0 }`
    *   **Description**: `TBD`
    *   **Backstory**: `TBD`
