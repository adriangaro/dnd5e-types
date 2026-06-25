/**
 * Weapon proficiency relationship layer: the type-level maps between the separate domains
 * (group sim/mar ↔ weapon type category ↔ specific weapon ↔ melee/ranged) and their reverse-lookup
 * query helpers — all expandable via the `Override…Map` merge points.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";

/* ---- reverse-lookup queries resolve from the populated defaults ---- */
{
  type SimpleWeapons = dnd5e.types.WeaponProficiency.GetWeaponsByGroup<"sim">;
  type _hasClub = Expect<Extends<"club", SimpleWeapons>>;
  type _notBattleaxe = Expect<Equal<Extends<"battleaxe", SimpleWeapons>, false>>;

  type MartialTypes = dnd5e.types.WeaponProficiency.GetTypesByGroup<"mar">;
  type _hasMartialM = Expect<Extends<"martialM", MartialTypes>>;

  type RangedTypes = dnd5e.types.WeaponProficiency.GetTypesByAttack<"ranged">;
  type _hasMartialR = Expect<Extends<"martialR", RangedTypes>>;
  type _meleeNotRanged = Expect<Equal<Extends<"martialM", RangedTypes>, false>>;
}

/* ---- CONFIG maps are typed by the relationship layer (populated, not empty Partial) ---- */
{
  type ProfMap = dnd5e.types.DND5EConfig["weaponProficienciesMap"];
  type _simpleM = Expect<Equal<ProfMap["simpleM"], "sim">>;
  type _improv = Expect<Equal<ProfMap["improv"], true>>;
  type TypeMap = dnd5e.types.DND5EConfig["weaponTypeMap"];
  type _martialR = Expect<Equal<TypeMap["martialR"], "ranged">>;
}

/* ---- expandable: a module maps a custom weapon to a group and queries follow ---- */
declare global {
  namespace dnd5e.types.WeaponId {
    interface OverrideTypes {
      laserRifle: true;
    }
  }
  namespace dnd5e.types.WeaponProficiency {
    interface OverrideWeaponMap {
      laserRifle: "mar";
    }
  }
}
{
  type _customMartial = Expect<Extends<"laserRifle", dnd5e.types.WeaponProficiency.GetWeaponsByGroup<"mar">>>;
}
