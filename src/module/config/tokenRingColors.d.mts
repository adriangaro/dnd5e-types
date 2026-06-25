/**
 * Token ring effect colors (Seam A; number-map). `CONFIG.DND5E.tokenRingColors`.
 *
 * Colors used for dynamic token ring effects. Keys are expandable; values are hex color numbers.
 */

declare global {
  namespace dnd5e.types {
    namespace TokenRingColor {
      interface DefaultTypes {
        damage: true;
        defeated: true;
        healing: true;
        temp: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      tokenRingColors: { [K in dnd5e.types.TokenRingColor.TypeKey]: number };
    }
  }
}

export {};
