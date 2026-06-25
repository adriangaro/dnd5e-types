/**
 * Weapon-type → proficiency map (map-style helper). `CONFIG.DND5E.weaponProficienciesMap`.
 *
 * Maps `DND5E.weaponTypes` keys to `DND5E.weaponProficiencies` keys (or a boolean) to
 * determine if a character has proficiency when adding an item. Typed by the expandable
 * `WeaponProficiency.ProficiencyMap` relationship layer (populated defaults).
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      weaponProficienciesMap: dnd5e.types.WeaponProficiency.ProficiencyMap;
    }
  }
}

export {};
