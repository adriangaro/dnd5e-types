/**
 * Individual (non-area) target types config domain (Seam A). `CONFIG.DND5E.individualTargetTypes`.
 */

declare global {
  namespace dnd5e.types {
    namespace IndividualTargetType {
      /** Core individual target types. */
      interface DefaultTypes {
        self: true;
        ally: true;
        enemy: true;
        creature: true;
        object: true;
        space: true;
        creatureOrObject: true;
        any: true;
        willing: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.individualTargetTypes[key]` entry. */
      interface Config {
        /** Localized label for this type. */
        label: string;
        /** Localization path for counted plural forms. Only necessary for scalar types. */
        counted?: string;
        /** Can this target take an associated numeric value? (default `true`). */
        scalar?: boolean;
      }
    }

    interface DND5EConfig {
      individualTargetTypes: {
        [K in dnd5e.types.IndividualTargetType.TypeKey]: dnd5e.types.IndividualTargetType.Config;
      };
    }
  }
}

export {};
