/**
 * Document layer: Item5e is registered (so `Item.Implementation` carries the dnd5e document methods),
 * and `SystemConfig` (`discriminate: "all"` + ignore base/module) makes `system` ergonomic to narrow.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";

declare const item: Item.Implementation;

/* ---- the other registered documents surface their dnd5e members & subtype narrowing ---- */
declare const actor: Actor.Implementation;
declare const eff: ActiveEffect.Implementation;
declare const msg: ChatMessage.Implementation;
{
  type _actorApply = Expect<Extends<typeof actor.applyActiveEffects, (...a: any[]) => void>>;
  type _effSource = Expect<Extends<typeof eff.getSource, (...a: any[]) => unknown>>;
  type _msgAssoc = Expect<Extends<typeof msg.getAssociatedActor, (...a: any[]) => unknown>>;

  // Actor narrows on `.type` → `.system` (discriminate:"all")
  function narrowActor(a: Actor.Implementation) {
    if (a.type === "character") {
      type _attrs = (typeof a)["system"]["attributes"];
    }
  }
}

/* ---- registration: dnd5e document members are present on the configured Item ---- */
{
  type _use = Expect<Extends<typeof item.use, (...a: any[]) => unknown>>;
  type _abilityMod = Expect<Equal<typeof item.abilityMod, dnd5e.types.Ability.TypeKey | null>>;
  type _hasAttack = Expect<Equal<typeof item.hasAttack, boolean>>;
  type _createActivity = Expect<Extends<typeof item.createActivity, (...a: any[]) => unknown>>;
  // a system flag default still resolves through the registered document
  type _scaling = Expect<Equal<ReturnType<typeof item.getFlag<"dnd5e", "scaling">>, number | undefined>>;
}

/* ---- SystemConfig: narrowing the document on `.type` ALSO narrows `.system` ---- */
{
  function narrow(i: Item.Implementation) {
    if (i.type === "weapon") {
      // `i.system` is now WeaponData — weapon-only members resolve with no further narrowing
      type _hasAttack = Expect<Equal<(typeof i)["system"]["hasAttack"], boolean>>;
      type _versatile = Expect<Equal<(typeof i)["system"]["isVersatile"], boolean>>;
    }
    if (i.type === "class") {
      type _levels = Expect<Equal<(typeof i)["system"]["levels"], number>>;
    }
  }

  // base + module subtypes are dropped from the configured union
  type _noBase = Expect<Equal<Extract<Item.ConfiguredSubType, "base">, never>>;
}

/* ---- `.Implementation` vs `.Known`: with discriminate:"all", `.Implementation` already narrows,
   so it's the default. `.Known` differs only by EXCLUDING the arbitrary module subtype. ---- */
{
  // `.Known` is exactly the configured dnd5e subtypes — no module/base noise
  type _knownClean = Expect<Equal<Item.Known["type"], Item.ConfiguredSubType>>;
  type _knownNoModule = Expect<Equal<Extract<Item.Known["type"], `${string}.${string}`>, never>>;
  // `.Known` ⊊ `.Implementation`: every known subtype is an Implementation subtype, but NOT vice-versa
  // (Implementation additionally carries the arbitrary module-subtype member).
  type _knownSubsetOfImpl = Expect<Extends<Item.Known["type"], Item.Implementation["type"]>>;
  // tuple-wrapped to suppress union distribution: Implementation as a whole is NOT a subset of Known
  type _implNotSubsetOfKnown = Expect<
    Equal<[Item.Implementation["type"]] extends [Item.Known["type"]] ? true : false, false>
  >;
}
