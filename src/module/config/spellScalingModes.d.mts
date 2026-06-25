/**
 * Spell damage scaling modes (Seam A, label map). `CONFIG.DND5E.spellScalingModes`.
 */

declare global {
  namespace dnd5e.types {
    namespace SpellScalingMode {
      /** The available choices for how spell damage scaling may be computed. */
      interface DefaultTypes {
        none: true;
        cantrip: true;
        level: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      spellScalingModes: { [K in dnd5e.types.SpellScalingMode.TypeKey]: string };
    }
  }
}

export {};
