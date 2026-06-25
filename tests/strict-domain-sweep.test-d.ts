/**
 * Strict-domain sweep: confirms the audit-driven tightening of data-model fields, getters, and
 * method signatures from bare `string` to their real (expandable) domain key unions. Spot-checks
 * one representative per cluster + the new `Spellcasting.Progression` domain and its expandability.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";

type SpellSys = Item.OfType<"spell">["system"];
type WeaponSys = Item.OfType<"weapon">["system"];
type ClassSys = Item.OfType<"class">["system"];
type NPCSys = Actor.OfType<"npc">["system"];
type VehicleSys = Actor.OfType<"vehicle">["system"];

/* ---- item schema fields ---- */
{
  type _spellAbility = Expect<Equal<SpellSys["ability"], dnd5e.types.Ability.TypeKey | "">>;
  type _spellSchool = Expect<Equal<SpellSys["school"], dnd5e.types.SpellSchool.TypeKey | "">>;
  type _spellMethod = Expect<Equal<SpellSys["method"], dnd5e.types.Spellcasting.Method.TypeKey | "">>;
  type _rangeUnits = Expect<Equal<NonNullable<WeaponSys["range"]["units"]>, dnd5e.types.DistanceUnit.TypeKey>>;
  type _classProg = Expect<Equal<ClassSys["spellcasting"]["progression"], dnd5e.types.Spellcasting.Progression.TypeKey>>;
  type _classAbility = Expect<Equal<ClassSys["spellcasting"]["ability"], dnd5e.types.Ability.TypeKey | "">>;
  type _weaponMastery = Expect<Equal<WeaponSys["mastery"], dnd5e.types.WeaponMastery.TypeKey | "">>;
  // strictness actually bites: an arbitrary string is NOT assignable
  type _strict = Expect<Equal<Extends<"not-a-school", SpellSys["school"]>, false>>;
}

/* ---- actor schema fields ---- */
{
  type _vehicleType = Expect<Equal<VehicleSys["details"]["type"], dnd5e.types.VehicleType.TypeKey>>;
  type _vehicleSize = Expect<Equal<VehicleSys["traits"]["size"], dnd5e.types.ActorSize.TypeKey>>;
  type _npcPrice = Expect<Equal<NPCSys["attributes"]["price"]["denomination"], dnd5e.types.Currency.TypeKey>>;
  type _npcTreasure = Expect<Extends<NPCSys["details"]["treasure"]["value"], ReadonlySet<dnd5e.types.Treasure.TypeKey>>>;
  // vehicle unit/denomination fields tightened from bare StringField → domain key unions
  type _vehCargoUnits = Expect<Equal<VehicleSys["attributes"]["capacity"]["cargo"]["units"], dnd5e.types.WeightUnit.TypeKey>>;
  type _vehWeightUnits = Expect<Equal<VehicleSys["traits"]["weight"]["units"], dnd5e.types.WeightUnit.TypeKey>>;
  type _vehKeelUnits = Expect<Equal<VehicleSys["traits"]["keel"]["units"], dnd5e.types.MovementUnit.TypeKey>>;
  type _vehBeamUnits = Expect<Equal<VehicleSys["traits"]["beam"]["units"], dnd5e.types.MovementUnit.TypeKey>>;
  type _vehPriceDenom = Expect<Equal<VehicleSys["attributes"]["price"]["denomination"], dnd5e.types.Currency.TypeKey>>;
  // damage-trait `bypasses` tightened from SetField<StringField> → item-property keys
  type DIBypass = NPCSys["traits"]["di"]["bypasses"] extends ReadonlySet<infer E> ? E : never;
  type _bypassStrict = Expect<Equal<Extends<"not-a-property", DIBypass>, false>>; // arbitrary string rejected
  type _bypassKeys = Expect<Extends<dnd5e.types.ItemProperty.TypeKey, DIBypass>>; // real property keys flow in
}

/* ---- the new Spellcasting.Progression domain: members + expandability ---- */
{
  type _hasFull = Expect<Extends<"full", dnd5e.types.Spellcasting.Progression.TypeKey>>;
  type _hasPact = Expect<Extends<"pact", dnd5e.types.Spellcasting.Progression.TypeKey>>;
  // distinct from the model-class registry (base/single/multi) and the method registry (spell/pact/...)
  type _notModelClass = Expect<Equal<Extends<"base", dnd5e.types.Spellcasting.Progression.TypeKey>, false>>;
}
declare global {
  namespace dnd5e.types.Spellcasting.Progression {
    interface OverrideTypes {
      quarter: true;
    }
  }
}
{
  type _widened = Expect<Extends<"quarter", dnd5e.types.Spellcasting.Progression.TypeKey>>;
  // the widened progression key flows into the class field
  type _flows = Expect<Extends<"quarter", ClassSys["spellcasting"]["progression"]>>;
}
