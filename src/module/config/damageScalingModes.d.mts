/**
 * Damage scaling mode config domain (Seam A). `CONFIG.DND5E.damageScalingModes`.
 *
 * Methods by which damage scales relative to the overall scaling increase.
 */

declare global {
  namespace dnd5e.types {
    namespace DamageScalingMode {
      /** Default scaling modes: whole-step and half-step. */
      interface DefaultTypes {
        whole: true;
        half: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.damageScalingModes[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
        /** Localized label used when scaling a cantrip. */
        labelCantrip: string;
      }
    }

    interface DND5EConfig {
      damageScalingModes: {
        [K in dnd5e.types.DamageScalingMode.TypeKey]: dnd5e.types.DamageScalingMode.Config;
      };
    }
  }
}

export {};
