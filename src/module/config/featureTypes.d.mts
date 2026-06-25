/**
 * Feature item types config domain (Seam A). `CONFIG.DND5E.featureTypes`.
 *
 * Keyed record of `SubtypeTypeConfiguration` (a label plus an optional localized subtypes map).
 */

declare global {
  namespace dnd5e.types {
    namespace FeatureType {
      /** Core feature categories. */
      interface DefaultTypes {
        background: true;
        class: true;
        monster: true;
        race: true;
        enchantment: true;
        feat: true;
        supernaturalGift: true;
        vehicle: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.featureTypes[key]` entry (SubtypeTypeConfiguration). */
      interface Config {
        /** Localized label for this feature type. */
        label: string;
        /** Localized labels for subtypes, keyed by subtype id. */
        subtypes?: Record<string, string>;
      }
    }

    interface DND5EConfig {
      featureTypes: { [K in dnd5e.types.FeatureType.TypeKey]: dnd5e.types.FeatureType.Config };
    }
  }
}

export {};
