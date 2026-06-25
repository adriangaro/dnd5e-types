/**
 * Default artwork config domain. `CONFIG.DND5E.defaultArtwork`.
 *
 * Maps each Document type (and its sub-types) to a default image path. Keyed by
 * Document type name, then by sub-type key, with image-path string values.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      defaultArtwork: {
        ActiveEffect: Partial<Record<globalThis.ActiveEffect.SubType, string>>;
        Actor: Partial<Record<globalThis.Actor.SubType, string>>;
        Item: Partial<Record<globalThis.Item.SubType, string>>;
      };
    }
  }
}

export {};
