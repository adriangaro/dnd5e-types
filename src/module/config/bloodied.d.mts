/**
 * Bloodied status config (single object, not a keyed record). `CONFIG.DND5E.bloodied`.
 *
 * Configuration for the special bloodied status effect.
 */

declare global {
  namespace dnd5e.types {
    namespace Bloodied {
      /** Shape of `CONFIG.DND5E.bloodied`. */
      interface Config {
        /** Localization key for the status effect name. */
        name: string;
        /** Icon image path. */
        img: string;
        /** Fraction of max HP at or below which a creature is bloodied (e.g. 0.5). */
        threshold: number;
      }
    }

    interface DND5EConfig {
      bloodied: dnd5e.types.Bloodied.Config;
    }
  }
}

export {};
