/**
 * Token ruler colors (Seam A; number-map). `CONFIG.DND5E.tokenRulerColors`.
 *
 * Colors used to denote movement speed on ruler segments & grid highlighting.
 * Keys are expandable; values are hex color numbers.
 */

declare global {
  namespace dnd5e.types {
    namespace TokenRulerColor {
      interface DefaultTypes {
        normal: true;
        double: true;
        triple: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      tokenRulerColors: { [K in dnd5e.types.TokenRulerColor.TypeKey]: number };
    }
  }
}

export {};
