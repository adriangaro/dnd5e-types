/**
 * Strict, expandable typing of weapon/armor/tool "allowed values in items": the item data models
 * bind their category/base-item/mastery/ability/properties fields to the real (expandable) config
 * domains instead of bare `string`. Strict (no `(string & {})` escape) yet widenable via Seam-A.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";

type WeaponSys = Item.OfType<"weapon">["system"];
type EquipSys = Item.OfType<"equipment">["system"];
type ToolSys = Item.OfType<"tool">["system"];

/* ---- weapon: value/baseItem/mastery/properties bound to their domains.
       `| ""` is the blank/unset state (e.g. a custom weapon with no category, or no mastery — a
       psi knife: no proficiency category yet still a valid `vex` mastery). Mastery is DECOUPLED:
       any WeaponMastery key is allowed on any weapon (funky combos), never restricted to defaults. ---- */
{
  type _value = Expect<Equal<WeaponSys["type"]["value"], dnd5e.types.WeaponType.TypeKey | "">>;
  type _baseItem = Expect<Equal<WeaponSys["type"]["baseItem"], dnd5e.types.WeaponId.TypeKey | "">>;
  type _mastery = Expect<Equal<WeaponSys["mastery"], dnd5e.types.WeaponMastery.TypeKey | "">>;
  // properties are the PER-TYPE set (weapon-only), not the global flat union
  type _props = Expect<Extends<WeaponSys["properties"], ReadonlySet<dnd5e.types.ItemProperty.Weapon.TypeKey>>>;
  type _propEl = Expect<Extends<"fin", dnd5e.types.ItemProperty.Weapon.TypeKey>>; // finesse is a weapon prop
  // blank empty-state is allowed; an arbitrary unknown string is NOT
  type _blankOk = Expect<Extends<"", WeaponSys["mastery"]>>;
  type _strict = Expect<Equal<Extends<"not-a-weapon-type", WeaponSys["type"]["value"]>, false>>;
}

/* ---- equipment (armor) + tool ---- */
{
  type _eqValue = Expect<Equal<EquipSys["type"]["value"], dnd5e.types.EquipmentType.TypeKey | "">>;
  type _eqBase = Expect<Equal<EquipSys["type"]["baseItem"], dnd5e.types.ArmorId.TypeKey | "">>;
  type _toolValue = Expect<Equal<ToolSys["type"]["value"], dnd5e.types.ToolType.TypeKey | "">>;
  type _toolBase = Expect<Equal<ToolSys["type"]["baseItem"], dnd5e.types.Tool.TypeKey | "">>;
  type _toolAbility = Expect<Equal<ToolSys["ability"], dnd5e.types.Ability.TypeKey | "">>;
}

/* ---- subtype: per-category expandable domains, unioned onto the field (no value coupling) ---- */
{
  type ConsumableSys = Item.OfType<"consumable">["system"];
  type FeatSys = Item.OfType<"feat">["system"];
  type _consumableSub = Expect<
    Equal<ConsumableSys["type"]["subtype"], dnd5e.types.ConsumableType.Subtype.TypeKey | "">
  >;
  // built-in per-category subtypes are present (ammo + poison)
  type _hasAmmoSub = Expect<Extends<"arrow", ConsumableSys["type"]["subtype"]>>;
  type _hasPoisonSub = Expect<Extends<"injury", ConsumableSys["type"]["subtype"]>>;
  type _featSub = Expect<Equal<FeatSys["type"]["subtype"], dnd5e.types.FeatureType.Subtype.TypeKey | "">>;
  type _hasClassFeat = Expect<Extends<"eldritchInvocation", FeatSys["type"]["subtype"]>>;
  type _blankOk = Expect<Extends<"", ConsumableSys["type"]["subtype"]>>;
}

/* ---- expandable PER CATEGORY: widen a specific subtype category, field follows ---- */
declare global {
  namespace dnd5e.types.ConsumableType.Ammo {
    interface OverrideTypes {
      plasmaBolt: true;
    }
  }
  namespace dnd5e.types.FeatureType.Class {
    interface OverrideTypes {
      bloodHunterCrimsonRite: true;
    }
  }
  // and a generic, category-less subtype (loot has no built-in categories)
  namespace dnd5e.types.LootType.Subtype {
    interface OverrideTypes {
      questItem: true;
    }
  }
}
{
  type _customAmmo = Expect<Extends<"plasmaBolt", Item.OfType<"consumable">["system"]["type"]["subtype"]>>;
  type _customClassFeat = Expect<Extends<"bloodHunterCrimsonRite", Item.OfType<"feat">["system"]["type"]["subtype"]>>;
  type _lootWidened = Expect<Extends<"questItem", Item.OfType<"loot">["system"]["type"]["subtype"]>>;
}

/* ---- expandable: a module widens a domain and the item field follows ---- */
declare global {
  namespace dnd5e.types.WeaponType {
    interface OverrideTypes {
      laserRifle: true;
    }
  }
}
{
  type _widened = Expect<Extends<"laserRifle", WeaponSys["type"]["value"]>>;
}

/* ---- per-type properties: scoped + independently expandable ---- */
{
  type SpellProps = NonNullable<Item.OfType<"spell">["system"]["properties"]>;
  type WeaponProps = NonNullable<WeaponSys["properties"]>;
  // a spell-only property (ritual) is a spell property but NOT a weapon property
  type _spellHasRitual = Expect<Extends<"ritual", dnd5e.types.ItemProperty.Spell.TypeKey>>;
  type _weaponLacksRitual = Expect<Equal<Extends<"ritual", dnd5e.types.ItemProperty.Weapon.TypeKey>, false>>;
  // ValidPropertyMap mirrors the per-type domains
  type _mapWeapon = Expect<Equal<dnd5e.types.ItemProperty.ValidPropertyMap["spell"], dnd5e.types.ItemProperty.Spell.TypeKey>>;
}
declare global {
  namespace dnd5e.types.ItemProperty.Weapon {
    interface OverrideTypes {
      doubleBladed: true;
    }
  }
}
{
  type _customWeaponProp = Expect<Extends<"doubleBladed", NonNullable<WeaponSys["properties"]> extends ReadonlySet<infer E> ? E : never>>;
  // widening the weapon property domain does NOT leak into spell properties
  type _noLeak = Expect<Equal<Extends<"doubleBladed", dnd5e.types.ItemProperty.Spell.TypeKey>, false>>;
}
