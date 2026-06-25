/**
 * Maximum ability score value allowed by default (scalar). `CONFIG.DND5E.maxAbilityScore`.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      maxAbilityScore: number;
    }
  }
}

export {};
