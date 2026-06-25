/**
 * Weapon proficiency RELATIONSHIP layer (type-level). The flat domains stay separate and expandable
 * — `WeaponProficiency` (groups: sim/mar), `WeaponType` (categories: simpleM/martialR/…), `WeaponId`
 * (base weapons), `WeaponMastery` — and this file adds the populated, expandable maps BETWEEN them
 * plus reverse-lookup query helpers, so CONFIG (`weaponProficienciesMap`, `weaponTypeMap`) and module
 * code can resolve "which weapons/types belong to which proficiency group" at the type level.
 *
 * Every map is `MergeOverrideDefinition<Default…, Override…>` — merge into the `Override…` interface
 * to extend it. Bases are loose `Record<string, …>` so adding a `WeaponId`/`WeaponType` never forces
 * a mapping (it just won't appear in queries until mapped).
 */

declare global {
  namespace dnd5e.types {
    namespace WeaponProficiency {
      /* -- specific weapon (WeaponId) → proficiency group (sim/mar) -- */
      interface DefaultWeaponMap extends Record<string, dnd5e.types.WeaponProficiency.TypeKey | never> {
        battleaxe: "mar";
        blowgun: "mar";
        club: "sim";
        dagger: "sim";
        dart: "sim";
        flail: "mar";
        glaive: "mar";
        greataxe: "mar";
        greatclub: "sim";
        greatsword: "mar";
        halberd: "mar";
        handaxe: "sim";
        handcrossbow: "mar";
        heavycrossbow: "mar";
        javelin: "sim";
        lance: "mar";
        lightcrossbow: "sim";
        lighthammer: "sim";
        longbow: "mar";
        longsword: "mar";
        mace: "sim";
        maul: "mar";
        morningstar: "mar";
        musket: "mar";
        pike: "mar";
        pistol: "mar";
        quarterstaff: "sim";
        rapier: "mar";
        scimitar: "mar";
        shortsword: "mar";
        sickle: "sim";
        spear: "sim";
        shortbow: "sim";
        sling: "sim";
        trident: "mar";
        warpick: "mar";
        warhammer: "mar";
        whip: "mar";
      }
      /** Downstream merge point for custom weapon→group mappings. */
      interface OverrideWeaponMap extends Record<string, dnd5e.types.WeaponProficiency.TypeKey | never> {}
      type WeaponMap = dnd5e.types.MergeOverrideDefinition<DefaultWeaponMap, OverrideWeaponMap>;

      /* -- weapon TYPE category (WeaponType) → group, or `true` (always proficient) -- */
      interface DefaultProficiencyMap extends Record<string, dnd5e.types.WeaponProficiency.TypeKey | boolean | never> {
        simpleM: "sim";
        simpleR: "sim";
        martialM: "mar";
        martialR: "mar";
        improv: true;
        natural: true;
        siege: true;
      }
      /** Downstream merge point for custom type→group mappings. */
      interface OverrideProficiencyMap extends Record<string, dnd5e.types.WeaponProficiency.TypeKey | boolean | never> {}
      type ProficiencyMap = dnd5e.types.MergeOverrideDefinition<DefaultProficiencyMap, OverrideProficiencyMap>;

      /* -- weapon TYPE category → 'melee' | 'ranged' (where fixed) -- */
      interface DefaultMeleeRangedMap extends Record<string, "melee" | "ranged" | never> {
        simpleM: "melee";
        simpleR: "ranged";
        martialM: "melee";
        martialR: "ranged";
        siege: "ranged";
      }
      /** Downstream merge point for custom type→melee/ranged mappings. */
      interface OverrideMeleeRangedMap extends Record<string, "melee" | "ranged" | never> {}
      type MeleeRangedMap = dnd5e.types.MergeOverrideDefinition<DefaultMeleeRangedMap, OverrideMeleeRangedMap>;

      /** Specific weapons (WeaponId) in proficiency group `G`. */
      type GetWeaponsByGroup<G extends dnd5e.types.WeaponProficiency.TypeKey> = dnd5e.types.FindKeyByValue<
        dnd5e.types.WeaponProficiency.WeaponMap,
        G
      >;
      /** Weapon type categories (WeaponType) in proficiency group `G`. */
      type GetTypesByGroup<G extends dnd5e.types.WeaponProficiency.TypeKey> = dnd5e.types.FindKeyByValue<
        dnd5e.types.WeaponProficiency.ProficiencyMap,
        G
      >;
      /** Weapon type categories that are `'melee'` or `'ranged'`. */
      type GetTypesByAttack<A extends "melee" | "ranged"> = dnd5e.types.FindKeyByValue<
        dnd5e.types.WeaponProficiency.MeleeRangedMap,
        A
      >;
    }
  }
}

export {};
