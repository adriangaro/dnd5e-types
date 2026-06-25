/**
 * Group actor structure types (Seam A). `CONFIG.DND5E.groupTypes`.
 *
 * Label map describing the kinds of actor structures a group can represent. Keys stay
 * downstream-expandable; each value is a localized label string.
 */

declare global {
  namespace dnd5e.types {
    namespace GroupType {
      /** Core group structures. */
      interface DefaultTypes {
        party: true;
        encounter: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      groupTypes: { [K in dnd5e.types.GroupType.TypeKey]: string };
    }
  }
}

export {};
