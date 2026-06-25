/**
 * Armor type config domain (Seam A). `CONFIG.DND5E.armorTypes`.
 *
 * Specific equipment types that modify base AC (light/medium/heavy/natural/shield).
 * Keyed label-map: values are localized strings, keys stay expandable.
 */

declare global {
  namespace dnd5e.types {
    namespace ArmorType {
      /** Core armor types. */
      interface DefaultTypes {
        light: true;
        medium: true;
        heavy: true;
        natural: true;
        shield: true;
      }

      /** Downstream merge point — add `{ myArmorType: true }` here. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      armorTypes: { [K in dnd5e.types.ArmorType.TypeKey]: string };
    }
  }
}

export {};
