/**
 * Whether to aggregate damage parts of the same type when displaying. `CONFIG.DND5E.aggregateDamageDisplay`.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      aggregateDamageDisplay: boolean;
    }
  }
}

export {};
