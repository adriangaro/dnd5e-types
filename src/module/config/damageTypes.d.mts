/**
 * Damage type config domain (Seam A). `CONFIG.DND5E.damageTypes`.
 *
 * The `Damage` namespace (DefaultTypes/Types/TypeKey) is established in `_stubs.d.mts`;
 * this file only layers in the per-entry `Config` shape and the `CONFIG.DND5E` funnel.
 */

declare global {
  namespace dnd5e.types {
    namespace Damage {
      /** Shape of each `CONFIG.DND5E.damageTypes[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
        /** Icon representing this damage type. */
        icon: string;
        /** Is this a type that can be bypassed by magical or silvered weapons? */
        isPhysical?: boolean;
        /** Reference to a rule page describing this damage type. */
        reference?: string;
        /** Visual color of the damage type. */
        color?: foundry.utils.Color;
      }
    }

    interface DND5EConfig {
      damageTypes: { [K in dnd5e.types.Damage.TypeKey]: dnd5e.types.Damage.Config };
    }
  }
}

export {};
