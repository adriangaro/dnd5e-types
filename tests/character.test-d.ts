/**
 * Type-level test suite for the CharacterData 1:1 mirror. A failing assertion is a tsc/tsgo
 * compile error, so this file IS the spec for: (1) the SOURCE schema (`_source`), (2) the
 * INITIALIZED + DERIVED read shape (`actor.system`), (3) nullable→derived narrowing, and
 * (4) the four expandability seams (config widening, field bridging, subtype registration,
 * schema/derived patching).
 */

import type { Expect, Equal, Extends } from "./_assert.ts";
import type CharacterData from "#dnd5e/module/data/actor/character.mjs";
import type Proficiency from "#dnd5e/module/documents/actor/proficiency.mjs";
import type HitDice from "#dnd5e/module/documents/actor/hit-dice.mjs";

/** The fully initialized + derived system instance (what `actor.system` is). */
type Sys = CharacterData;
/** The persisted `_source` (what `toObject()` / the DB holds). */
type Src = CharacterData["_source"];

/* ========================================================================== *
 *  1. Source schema — fields exist with the persisted (nullable) shape
 * ========================================================================== */
{
  // abilities map is keyed by the Ability union and carries the source ability shape.
  type StrSrc = Src["abilities"]["str"];
  type _value = Expect<Equal<StrSrc["value"], number>>;
  // proficient omits `nullable:false`, so source is `number | null` (faithful to the field default).
  type _profSrc = Expect<Equal<NonNullable<StrSrc["proficient"]>, number>>;
  // `max` is nullable in source.
  type _maxSrc = Expect<Equal<StrSrc["max"], number | null>>;

  // hp.max / hp.value are nullable in source.
  type _hpMaxSrc = Expect<Equal<Src["attributes"]["hp"]["max"], number | null>>;
  type _hpValSrc = Expect<Equal<Src["attributes"]["hp"]["value"], number | null>>;

  // currency (mixed in via CurrencyTemplate) is present and keyed by the Currency union.
  type _gp = Expect<Equal<Src["currency"]["gp"], number>>;

  // character-specific source fields exist.
  type _origClass = Expect<Equal<Src["details"]["originalClass"], string>>;
  type _xpVal = Expect<Equal<Src["details"]["xp"]["value"], number>>;
  type _inspiration = Expect<Equal<NonNullable<Src["attributes"]["inspiration"]>, boolean>>;
}

/* ========================================================================== *
 *  1b. DESYNC GUARDS — the read shape is built FROM the schema, so every source
 *  key must survive into the derived read shape. If a schema edit and its derived
 *  overlay drift apart, one of these flips to a compile error (the desync detector).
 * ========================================================================== */
{
  // every source attributes/details key is present on the derived read shape.
  type _attrsSurvive = Expect<Extends<keyof Src["attributes"], keyof Sys["attributes"]>>;
  type _detailsSurvive = Expect<Extends<keyof Src["details"], keyof Sys["details"]>>;
  // hp keeps all its source keys (it is `InitializedOf<…>` narrowed, not a re-typed copy).
  type _hpSurvive = Expect<Extends<keyof Src["attributes"]["hp"], keyof Sys["attributes"]["hp"]>>;
}

/* ========================================================================== *
 *  2. Derived ability data — computed props exist; nullable narrowed
 * ========================================================================== */
{
  type Str = Sys["abilities"]["str"];
  type _mod = Expect<Equal<Str["mod"], number>>;
  type _attack = Expect<Equal<Str["attack"], number>>;
  type _dc = Expect<Equal<Str["dc"], number>>;
  type _checkProf = Expect<Equal<Str["checkProf"], Proficiency>>;
  type _saveProf = Expect<Equal<Str["saveProf"], Proficiency>>;
  // derived `save.value` layered onto the roll config.
  type _saveValue = Expect<Equal<Str["save"]["value"], number>>;
  // NARROWED: source `max: number | null` → derived `number`.
  type _maxDerived = Expect<Equal<Str["max"], number>>;
}

/* ========================================================================== *
 *  3. Derived attributes / skills / details
 * ========================================================================== */
{
  // hp.max narrowed to number in the derived read shape.
  type _hpMax = Expect<Equal<Sys["attributes"]["hp"]["max"], number>>;
  type _hpEff = Expect<Equal<Sys["attributes"]["hp"]["effectiveMax"], number>>;
  type _hpPct = Expect<Equal<Sys["attributes"]["hp"]["pct"], number>>;

  // prof (prepareBaseData) + hd (HitDice instance).
  type _prof = Expect<Equal<Sys["attributes"]["prof"], number>>;
  type _hd = Expect<Equal<Sys["attributes"]["hd"], HitDice>>;

  // ac / init / movement / spell derived bits.
  type _acValue = Expect<Equal<Sys["attributes"]["ac"]["value"], number>>;
  type _initTotal = Expect<Equal<Sys["attributes"]["init"]["total"], number>>;
  type _initProf = Expect<Equal<Sys["attributes"]["init"]["prof"], Proficiency>>;
  type _speed = Expect<Equal<Sys["attributes"]["movement"]["speed"], number>>;
  type _spellDc = Expect<Equal<Sys["attributes"]["spell"]["dc"], number>>;

  // skills derived shape.
  type Acr = Sys["skills"]["acr"];
  type _skillMod = Expect<Equal<Acr["mod"], number>>;
  type _skillPassive = Expect<Equal<Acr["passive"], number>>;
  type _skillProf = Expect<Equal<Acr["prof"], Proficiency>>;
  type _skillTotal = Expect<Equal<Acr["total"], number>>;

  // details derived: level (base) + tier + creature type.
  type _level = Expect<Equal<Sys["details"]["level"], number>>;
  type _tier = Expect<Equal<Sys["details"]["tier"], number>>;
  type _xpPct = Expect<Equal<Sys["details"]["xp"]["pct"], number>>;
  type _ctype = Expect<Extends<Sys["details"]["type"]["value"], string>>;
}

/* ========================================================================== *
 *  4a. Seam C — subtype registered, Actor.OfType narrows system to CharacterData
 * ========================================================================== */
{
  type SysViaActor = Actor.OfType<"character">["system"];
  type _registered = Expect<Equal<SysViaActor, CharacterData>>;
  type _modAccessible = Expect<Equal<SysViaActor["abilities"]["str"]["mod"], number>>;
}

/* ========================================================================== *
 *  4b. Seam A — widen Ability.TypeKey; every map keyed by it widens transitively
 * ========================================================================== */
declare global {
  namespace dnd5e.types.Ability {
    interface OverrideTypes {
      hon: true;
    }
  }
}
{
  type _key = Expect<Extends<"hon", dnd5e.types.Ability.TypeKey>>;
  // the new ability flows into both the source map and the derived map.
  type _srcHon = Expect<Equal<Src["abilities"]["hon"]["value"], number>>;
  type _derHon = Expect<Equal<Sys["abilities"]["hon"]["mod"], number>>;
}

/* ========================================================================== *
 *  4c. Seam D — patch SOURCE schema + DERIVED data from a downstream module
 * ========================================================================== */
declare global {
  namespace dnd5e.types.DataModelConfig.Actor.character {
    interface OverrideSchema {
      heroPoints: foundry.data.fields.NumberField<{ required: true; integer: true; initial: 0 }>;
    }
    interface OverrideDerived {
      computedThing: { ok: boolean };
    }
  }
}
{
  // injected source field is present in both _source and the initialized shape (numeric).
  type _srcPatch = Expect<Equal<NonNullable<Src["heroPoints"]>, number>>;
  type _initPatch = Expect<Equal<NonNullable<Sys["heroPoints"]>, number>>;
  // injected derived prop is present on the read shape.
  type _derPatch = Expect<Equal<Sys["computedThing"], { ok: boolean }>>;
}

/* ========================================================================== *
 *  5. Deepened attributes fidelity (the workflow-extracted derived spec)
 * ========================================================================== */
{
  type A = Sys["attributes"];

  // ac: formula-strings replaced by numbers + new computed props.
  type _acMin = Expect<Equal<A["ac"]["min"], number>>;
  type _acBonus = Expect<Equal<A["ac"]["bonus"], number>>;
  type _acDex = Expect<Equal<A["ac"]["dex"], number>>;
  type _acArmor = Expect<Equal<A["ac"]["equippedArmor"], Item.Implementation | null>>;
  type _acClamped = Expect<Extends<A["ac"]["clamped"], Record<dnd5e.types.Ability.TypeKey, number>>>;

  // movement: speed formulas → numbers + new props.
  type _mvWalk = Expect<Equal<A["movement"]["walk"], number>>;
  type _mvSpeed = Expect<Equal<A["movement"]["speed"], number>>;
  type _mvSlowed = Expect<Equal<A["movement"]["slowed"], boolean>>;
  type _mvJump = Expect<Equal<A["movement"]["jump"], number>>;

  // encumbrance: new derived props AND preserved source subtree (bonuses formulas).
  type _encVal = Expect<Equal<A["encumbrance"]["value"], number>>;
  type _encStops = Expect<Equal<A["encumbrance"]["stops"]["encumbered"], number>>;
  type _encSrc = Expect<Equal<NonNullable<A["encumbrance"]["bonuses"]["overall"]>, string>>; // source formula preserved

  // init: derived total/prof on top of the preserved source roll config.
  type _initTotal2 = Expect<Equal<A["init"]["total"], number>>;
  type _initAbility = Expect<Extends<A["init"]["ability"], string>>; // source field preserved

  // concentration: derived save + preserved source `limit`.
  type _concSave = Expect<Equal<A["concentration"]["save"], number>>;
  type _concLimit = Expect<Equal<NonNullable<A["concentration"]["limit"]>, number>>; // source preserved

  // spell: derived-only subtree.
  type _spellAttack = Expect<Equal<A["spell"]["attack"], number>>;
  type _spellLabel = Expect<Equal<A["spell"]["abilityLabel"], string>>;

  // hp: narrowed max/value + preserved source keys (temp/tempmax) + new props.
  type _hpDamage = Expect<Equal<A["hp"]["damage"], number>>;
  type _hpTemp = Expect<Equal<A["hp"]["temp"], number>>; // source preserved

  // skills: ability normalized to the Ability union.
  type _skillAbility = Expect<Extends<Sys["skills"]["acr"]["ability"], dnd5e.types.Ability.TypeKey>>;
}
