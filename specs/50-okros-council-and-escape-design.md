# Design: Okros Midnight Council & Ambushed Escape Session Update

## Overview
This specification details the narrative progression, entity updates, timeline events, and quest updates following the party's entry into Okros with the glowing Blessed Branch, their midnight council meeting in the hillside church, the moral dilemma presented by Elder Akadona and Orion regarding 4,000+ refugees, and their dawn escape attempt ambushed by Syzl.

---

## 1. Entity Updates & Additions

### NPC: Elder Akadona (New)
- **ID**: `elder-akadona`
- **Name**: `Elder Akadona`
- **Role**: `Town Elder & Council Leader`
- **Location**: `okros`
- **Description**: A venerable female orc elder over 120 years old who leads the governing council of Okros. Frail of body and relying on a walking stick, she chose transparency and reason over violence, resisting council hardliners who demanded seizing the party's Blessed Branch by force.

### NPC: Syzl (Update)
- **ID**: `syzl`
- **Name**: `Syzl`
- **Role**: `Okros Militia Leader`
- **Location**: `okros`
- **Description**: A stern, battle-weary Drakona commander of the Okros militia. Facing severe overcrowding from 4,000+ refugees and the strain of defending the walls, he admitted the party after spotting the Blessed Branch's glow. Correctly anticipating the party would flee rather than surrender the branch, he placed rooftop snipers above the church garden and blocked their escape with his guards.

### NPC: Orion (Update)
- **ID**: `orion`
- **Name**: `Orion`
- **Role**: `Metalworks Master & Council Member`
- **Location**: `okros`
- **Description**: A Clank who awakened to sentience 100 years ago during the divine abandonment, now overseeing the Okros forge and sitting on the town council. Sharing an unspoken kinship with Zenith, he walked Zenith to the central pyre to plead the plight of 4,000+ refugees and proposed igniting a second Sacred Pyre in Okros using the Blessed Branch.

### NPC: Biff (Update)
- **ID**: `biff`
- **Name**: `Biff`
- **Role**: `Party Companion & Rogue`
- **Location**: `okros`
- **Description**: A skittish human rogue who aids the party. Deciding he and Tomaś would be liabilities in the dangerous trek back to Flaxenwood, the party left him in the church garden, where he discreetly scavenged church supplies to prepare for whatever comes next.

### NPC: Tomaś (Update)
- **ID**: `tomas`
- **Name**: `Tomaś`
- **Role**: `Party Companion & Fighter`
- **Location**: `okros`
- **Description**: A young human fighter of hidden Celestial heritage. Deemed too vulnerable for the perilous return journey to Flaxenwood, he was left sheltered in the quiet sanctuary of the church back garden in Okros alongside Biff.

### Location: Okros (`okros`) (Update)
- **ID**: `okros`
- **Name**: `Okros`
- **Region**: `Idol Hollows`
- **Description**: An emergent fortified town of melted shields and stone built around a central Sacred Pyre. Typically home to 2,500–3,000 residents, the collapse of surrounding village pyres has flooded Okros with over 4,000 refugees residing in dense tent encampments inside the walls and outside both eastern and western gates. The hillside church serves as weekly worship space, emergency council chamber, and crisis operations center.

---

## 2. Timeline Events

### Event 1: The Midnight Council at Okros
- **ID**: `evt-okros-midnight-council`
- **Title**: `The Midnight Council at Okros`
- **Type**: `npc_meet`
- **Location ID**: `okros`
- **Time**:
  - Era: `Age of Umbra`
  - Year: `100`
  - Month: `Shade-Weave`
  - Day: `21`
  - Hour: `19`
  - Minute: `0`
- **Description**: Syzl admits the party through the gates after spotting the Blessed Branch's beacon-like glow across the wastes. Passing sprawling refugee tent cities, the party is escorted to the hillside church where the council remains assembled near midnight. Orion takes Zenith toward the central pyre, explaining that Okros's 2,500-capacity infrastructure is collapsing under 4,000+ refugees, proposing a second sacred pyre in Okros. Simultaneously, Elder Akadona privately informs Stan Jr. and Fury that council hardliners favored taking the branch by force, leaving the moral burden of saving the refugees in the party's hands.

### Event 2: Dawn Ambush at the Church Garden
- **ID**: `evt-church-garden-ambush`
- **Title**: `Dawn Ambush at the Church Garden`
- **Type**: `combat`
- **Location ID**: `okros`
- **Time**:
  - Era: `Age of Umbra`
  - Year: `100`
  - Month: `Shade-Weave`
  - Day: `22`
  - Hour: `6`
  - Minute: `0`
- **Description**: Resting in the church garden, the party resolves to return to Flaxenwood to rescue survivors before committing the branch, leaving Tomaś and Biff behind in safety while Biff scours the church for supplies. Anticipating the council's hostility if they refuse to relinquish the branch, the party sneaks out at dawn. However, Syzl anticipated their flight, positioning rooftop guards on adjacent buildings. As Stan Jr. and Zenith attempt to break out on foot, Syzl and his militia confront them, while Fury takes flight above the church clutching the glowing Blessed Branch.

---

## 3. Quests & Home Configuration

### Quest Updates
- **Existing Quest**: `Investigate the Okros Refugee Crisis`
  - **Status**: `completed`
  - **Description**: Discover why refugees from surrounding settlements are flooding Okros. The party uncovered that neighboring village pyres collapsed, driving 4,000+ desperate souls into Okros and pushing the town to the brink of collapse.
- **New Active Quest**:
  - **Title**: `Escape the Okros Ambush`
  - **Status**: `active`
  - **Location ID**: `okros`
  - **Description**: Break through Syzl's militia encirclement at the hillside church garden and safely escape the fortified town of Okros with the Blessed Branch.
- **New Pending Quest**:
  - **Title**: `Flaxenwood Relief Expedition`
  - **Status**: `pending`
  - **Location ID**: `flaxenwood`
  - **Description**: Journey back to Flaxenwood through the Umbra to locate survivors, bring them back to Okros, or rekindle Flaxenwood's Sacred Pyre if the situation is dire.

### Home Configuration
- `lastLocationId`: `okros`
- `nextDestinationId`: `flaxenwood`
- `activeQuest`: `Escape the Okros Ambush`
