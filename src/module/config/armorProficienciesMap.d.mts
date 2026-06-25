/**
 * Map of equipment types to armor proficiency categories (helper map, not Seam A).
 * `CONFIG.DND5E.armorProficienciesMap`.
 *
 * Maps `DND5E.equipmentTypes` keys to either `true` (always proficient) or an
 * `DND5E.armorProficiencies` key string.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      /**
       * A mapping between `DND5E.equipmentTypes` and `DND5E.armorProficiencies` that is used to
       * determine if character has proficiency when adding an item.
       */
      armorProficienciesMap: Partial<{ [K in dnd5e.types.EquipmentType.TypeKey]: boolean | dnd5e.types.ArmorProficiency.TypeKey }>;
    }
  }
}

export {};
