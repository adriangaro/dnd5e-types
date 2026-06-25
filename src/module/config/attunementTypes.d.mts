/**
 * Item attunement type config domain (Seam A). `CONFIG.DND5E.attunementTypes`.
 *
 * Enumeration of item attunement types (required/optional). Keyed label-map.
 */

declare global {
  namespace dnd5e.types {
    namespace AttunementType {
      /** Core attunement types. */
      interface DefaultTypes {
        required: true;
        optional: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      attunementTypes: { [K in dnd5e.types.AttunementType.TypeKey]: string };
    }
  }
}

export {};
