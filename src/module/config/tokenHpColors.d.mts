/**
 * Token HP bar colors (Seam A; number-map). `CONFIG.DND5E.tokenHPColors`.
 *
 * Colors used to visualize temporary and temporary-maximum HP in token health bars.
 * Keys are expandable; values are hex color numbers.
 */

declare global {
  namespace dnd5e.types {
    namespace TokenHPColor {
      interface DefaultTypes {
        damage: true;
        healing: true;
        temp: true;
        tempmax: true;
        negmax: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      tokenHPColors: { [K in dnd5e.types.TokenHPColor.TypeKey]: number };
    }
  }
}

export {};
