/**
 * Equipment types that aren't armor (Seam A, label map). `CONFIG.DND5E.miscEquipmentTypes`.
 */

declare global {
  namespace dnd5e.types {
    namespace MiscEquipmentType {
      /** Non-armor equipment types. */
      interface DefaultTypes {
        clothing: true;
        ring: true;
        rod: true;
        trinket: true;
        vehicle: true;
        wand: true;
        wondrous: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      miscEquipmentTypes: { [K in dnd5e.types.MiscEquipmentType.TypeKey]: string };
    }
  }
}

export {};
