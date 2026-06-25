/**
 * Healing types config domain (Seam A). `CONFIG.DND5E.healingTypes`.
 *
 * Keyed record describing the kinds of healing that abilities can apply (healing, temp HP,
 * maximum HP). Shaped like `DamageTypeConfiguration` with an added short label.
 */

declare global {
  namespace dnd5e.types {
    namespace HealingType {
      /** Core healing kinds. */
      interface DefaultTypes {
        healing: true;
        temphp: true;
        maximum: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.healingTypes[key]` entry (DamageTypeConfiguration-like). */
      interface Config {
        /** Localized label. */
        label: string;
        /** Localized short label. */
        labelShort?: string;
        /** Icon path representing this healing type. */
        icon: string;
        /** Visual color of the healing type. */
        color?: foundry.utils.Color;
        /** Is this a type that can be bypassed by magical or silvered weapons? */
        isPhysical?: boolean;
        /** UUID of a rule reference describing this type. */
        reference?: string;
      }
    }

    interface DND5EConfig {
      healingTypes: { [K in dnd5e.types.HealingType.TypeKey]: dnd5e.types.HealingType.Config };
    }
  }
}

export {};
