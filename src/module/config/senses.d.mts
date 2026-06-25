/**
 * Sense config domain (Seam A). `CONFIG.DND5E.senses`.
 *
 * The `Senses` namespace (DefaultTypes/OverrideTypes/Types/TypeKey) is declared in `_stubs.d.mts`;
 * this file only layers in the `Config` shape and the `DND5EConfig` funnel entry.
 */

declare global {
  namespace dnd5e.types {
    namespace Senses {
      /** Configuration data for an actor sense type. */
      interface Config {
        /** Localized label for the sense. */
        label: string;
        /** Detection mode ID to add to the token (e.g. "blindsight", "feelTremor"). */
        detectionMode?: string;
        /** Whether this sense grants token vision (sight.enabled & sight.range). */
        grantsSight?: boolean;
        /** Vision mode ID to set on the token when this sense provides sight. */
        visionMode?: string;
      }
    }

    interface DND5EConfig {
      senses: { [K in dnd5e.types.Senses.TypeKey]: dnd5e.types.Senses.Config };
    }
  }
}

export {};
