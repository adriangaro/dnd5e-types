/**
 * Trackable token-resource attributes (scalar array). `CONFIG.DND5E.trackableAttributes`.
 *
 * A selection of actor attributes that can be tracked on token resource bars.
 * @deprecated since v10
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      trackableAttributes: string[];
    }
  }
}

export {};
