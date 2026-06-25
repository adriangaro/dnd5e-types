/**
 * Equipment-type label map (Seam A). `CONFIG.DND5E.equipmentTypes`.
 *
 * Runtime: `{...DND5E.miscEquipmentTypes, ...DND5E.armorTypes}` — a pure spread merge.
 * Keys are derived from the constituent namespaces so downstream additions to
 * `ArmorType.OverrideTypes` or `MiscEquipmentType.OverrideTypes` propagate here automatically.
 */

declare global {
  namespace dnd5e.types {
    namespace EquipmentType {
      /** Downstream merge point for equipment types not covered by ArmorType or MiscEquipmentType. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      /**
       * Union of all armor keys, misc equipment keys, and any local overrides.
       * Mirrors runtime: `{...miscEquipmentTypes, ...armorTypes}`.
       */
      type TypeKey =
        | dnd5e.types.ArmorType.TypeKey
        | dnd5e.types.MiscEquipmentType.TypeKey
        | dnd5e.types.ExtractKeys<OverrideTypes>;
    }

    interface DND5EConfig {
      /**
       * The set of equipment types for armor, clothing, and other objects which can be worn by the character.
       * @enum {string}
       */
      equipmentTypes: { [K in dnd5e.types.EquipmentType.TypeKey]: string };
    }
  }
}

export {};
