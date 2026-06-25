/**
 * Region behaviors: the three dnd5e subtypes register on `DataModelConfig.RegionBehavior`, so a
 * `RegionBehavior.OfType<…>` narrows `system` to the matching schema, and the strict domains/unions
 * (sizes/types/directionMode/mode) flow through.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";

{
  type AAE = RegionBehavior.OfType<"dnd5e.applyActiveEffect">["system"];
  type _sizes = Expect<Extends<AAE["sizes"], ReadonlySet<dnd5e.types.ActorSize.TypeKey>>>;
  type _types = Expect<Extends<AAE["types"], ReadonlySet<dnd5e.types.Creature.TypeKey>>>;

  type DT = RegionBehavior.OfType<"dnd5e.difficultTerrain">["system"];
  type _magical = Expect<Equal<DT["magical"], boolean>>;

  type RA = RegionBehavior.OfType<"dnd5e.rotateArea">["system"];
  type _dir = Expect<Equal<RA["directionMode"], "cw" | "ccw" | "short" | "long">>;
  type _mode = Expect<Equal<RA["time"]["mode"], "fixed" | "variable">>;
}
