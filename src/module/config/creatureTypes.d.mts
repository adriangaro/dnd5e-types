/**
 * Creature type config domain (Seam A). `CONFIG.DND5E.creatureTypes`.
 *
 * The `Creature` namespace (DefaultTypes/Types/TypeKey) is established in `_stubs.d.mts`;
 * this file only layers in the per-entry `Config` shape and the `CONFIG.DND5E` funnel.
 */

declare global {
  namespace dnd5e.types {
    namespace Creature {
      /** Shape of each `CONFIG.DND5E.creatureTypes[key]` entry. */
      interface Config {
        /** Localized label. */
        label: string;
        /** Localized plural form used in swarm names. */
        plural: string;
        /** Reference to a rule page describing this type. */
        reference?: string;
        /** Detectable by spells such as "Detect Evil and Good"? */
        detectAlignment?: boolean;
      }
    }

    interface DND5EConfig {
      creatureTypes: { [K in dnd5e.types.Creature.TypeKey]: dnd5e.types.Creature.Config };
    }
  }
}

export {};
