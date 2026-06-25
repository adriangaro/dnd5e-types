/**
 * Status effects that never block token movement (populated during setup).
 * `CONFIG.DND5E.neverBlockStatuses`.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      neverBlockStatuses: Set<dnd5e.types.StatusEffect.TypeKey | dnd5e.types.Condition.TypeKey | string>;
    }
  }
}

export {};
