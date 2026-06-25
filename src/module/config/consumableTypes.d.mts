/**
 * Consumable item types config domain (Seam A). `CONFIG.DND5E.consumableTypes`.
 *
 * Each entry is a `SubtypeTypeConfiguration` (label + optional subtype label-map).
 *
 * Downstream modules add a type in one line:
 *   declare global { namespace dnd5e.types.ConsumableType { interface OverrideTypes { myType: true } } }
 */

declare global {
  namespace dnd5e.types {
    namespace ConsumableType {
      /** Core consumable types. */
      interface DefaultTypes {
        ammo: true;
        potion: true;
        poison: true;
        food: true;
        scroll: true;
        wand: true;
        rod: true;
        trinket: true;
        wondrous: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.consumableTypes[key]` entry. */
      interface Config {
        /** Localized label for this type. */
        label: string;
        /** Map of subtype key to localized label. */
        subtypes?: Record<string, string>;
      }
    }

    interface DND5EConfig {
      /**
       * Enumerate the valid consumable types which are recognized by the system.
       * @enum {SubtypeTypeConfiguration}
       */
      consumableTypes: { [K in dnd5e.types.ConsumableType.TypeKey]: dnd5e.types.ConsumableType.Config };
    }
  }
}

export {};
