/**
 * Cross-actor registration smoke test. Every actor subtype must be registered via Seam C
 * (so `Actor.OfType<k>` narrows `system` to the right model) and expose its system instance.
 * A failing assertion is a compile error.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";
import type CharacterData from "#dnd5e/module/data/actor/character.mjs";
import type NPCData from "#dnd5e/module/data/actor/npc.mjs";
import type VehicleData from "#dnd5e/module/data/actor/vehicle.mjs";
import type GroupData from "#dnd5e/module/data/actor/group.mjs";
import type EncounterData from "#dnd5e/module/data/actor/encounter.mjs";

/* All five subtype keys are in the Actor.SubType union (funnelled from DataModelConfig.Actor). */
{
  type _hasChar = Expect<Extends<"character", Actor.SubType>>;
  type _hasNpc = Expect<Extends<"npc", Actor.SubType>>;
  type _hasVeh = Expect<Extends<"vehicle", Actor.SubType>>;
  type _hasGrp = Expect<Extends<"group", Actor.SubType>>;
  type _hasEnc = Expect<Extends<"encounter", Actor.SubType>>;
}

/* Actor.OfType narrows system to the matching data model for each subtype. */
{
  type _char = Expect<Equal<Actor.OfType<"character">["system"], CharacterData>>;
  type _npc = Expect<Equal<Actor.OfType<"npc">["system"], NPCData>>;
  type _veh = Expect<Equal<Actor.OfType<"vehicle">["system"], VehicleData>>;
  type _grp = Expect<Equal<Actor.OfType<"group">["system"], GroupData>>;
  type _enc = Expect<Equal<Actor.OfType<"encounter">["system"], EncounterData>>;
}

/* Spot-check a derived prop on each so the model is genuinely wired, not just registered. */
{
  // creature-derived: NPC has abilities + skills maps.
  type _npcMod = Expect<Equal<NPCData["abilities"]["str"]["mod"], number>>;
  type _npcCr = Expect<Extends<NPCData["details"]["cr"], number | null | undefined>>;
  // vehicle is common-derived (abilities, no skills); has ac.
  type _vehAc = Expect<Equal<VehicleData["attributes"]["ac"]["value"], number>>;
  // group/encounter share currency via GroupTemplate.
  type _grpGp = Expect<Equal<GroupData["currency"]["gp"], number>>;
  type _encGp = Expect<Equal<EncounterData["currency"]["gp"], number>>;
}
