/**
 * Flag seam: `flags.dnd5e.*` carries the system defaults AND is expandable via
 * `dnd5e.types.FlagConfig.<Doc>` declaration merging (funneled into fvtt-types' FlagConfig).
 */

import type { Expect, Equal } from "./_assert.ts";

declare const item: Item.Implementation;
declare const actor: Actor.Implementation;
declare const effect: ActiveEffect.Implementation;

/* ---- default system flags type ---- */
{
  type _scaling = Expect<Equal<ReturnType<typeof item.getFlag<"dnd5e", "scaling">>, number | undefined>>;
  type _spellLevel = Expect<Equal<ReturnType<typeof item.getFlag<"dnd5e", "spellLevel">>, number | undefined>>;
  type _poly = Expect<Equal<ReturnType<typeof actor.getFlag<"dnd5e", "isPolymorphed">>, boolean | undefined>>;
  type _orig = Expect<Equal<ReturnType<typeof actor.getFlag<"dnd5e", "originalActor">>, string | undefined>>;
  type _effType = Expect<Equal<ReturnType<typeof effect.getFlag<"dnd5e", "type">>, string | undefined>>;
}

/* ---- EXPANDABILITY: downstream adds a dnd5e-scoped flag ---- */
declare global {
  namespace dnd5e.types.FlagConfig {
    interface Item {
      homebrewMark?: string;
    }
  }
}
{
  type _hb = Expect<Equal<ReturnType<typeof item.getFlag<"dnd5e", "homebrewMark">>, string | undefined>>;
}
