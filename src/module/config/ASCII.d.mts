/**
 * ASCII artwork banner (scalar). `CONFIG.DND5E.ASCII`.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      ASCII: string;
    }
  }
}

export {};
