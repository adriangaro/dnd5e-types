/**
 * Maximum allowed character level (scalar). `CONFIG.DND5E.maxLevel`.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      maxLevel: number;
    }
  }
}

export {};
