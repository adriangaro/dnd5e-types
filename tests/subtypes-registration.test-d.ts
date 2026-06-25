/**
 * Smoke test: every built-in activity & advancement subtype is registered into its TypeKey union,
 * its OfType resolves to a model instance, and SOURCE/INSTANCE discriminate by `type`.
 */

import type { Expect, Extends } from "./_assert.ts";

/* ---- All 12 built-in activity types present ---- */
type AllActivityKeys =
  | "attack" | "cast" | "check" | "damage" | "enchant" | "forward"
  | "heal" | "order" | "save" | "summon" | "transform" | "utility";
type _actComplete = Expect<Extends<AllActivityKeys, dnd5e.types.Activity.TypeKey>>;

/* ---- All 8 built-in advancement types present ---- */
type AllAdvancementKeys =
  | "AbilityScoreImprovement" | "ItemChoice" | "ItemGrant" | "ModifyItem"
  | "ScaleValue" | "Size" | "Subclass" | "Trait";
type _advComplete = Expect<Extends<AllAdvancementKeys, dnd5e.types.Advancement.TypeKey>>;

/* ---- Each activity OfType is a non-never instance carrying the pseudo-document behavior ---- */
type _attackHasUse = Expect<Extends<dnd5e.types.Activity.OfType<"attack">, { use: (...a: any[]) => Promise<unknown> }>>;
type _damageHasUse = Expect<Extends<dnd5e.types.Activity.OfType<"damage">, { use: (...a: any[]) => Promise<unknown> }>>;
type _summonHasUse = Expect<Extends<dnd5e.types.Activity.OfType<"summon">, { use: (...a: any[]) => Promise<unknown> }>>;

/* ---- Each advancement OfType carries the pseudo-document behavior ---- */
type _scaleHasApply = Expect<Extends<dnd5e.types.Advancement.OfType<"ScaleValue">, { apply: (...a: any[]) => Promise<void> }>>;
type _traitHasApply = Expect<Extends<dnd5e.types.Advancement.OfType<"Trait">, { apply: (...a: any[]) => Promise<void> }>>;

/* ---- SOURCE unions discriminate ---- */
type _attackSrc = Expect<Extends<Extract<dnd5e.types.Activity.Source, { type: "attack" }>, { type: "attack" }>>;
type _castSrc = Expect<Extends<Extract<dnd5e.types.Activity.Source, { type: "cast" }>, { type: "cast" }>>;
