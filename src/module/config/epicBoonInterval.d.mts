/**
 * XP interval above the maximum that grants an epic boon. `CONFIG.DND5E.epicBoonInterval`.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      /** Intervals above the maximum XP that result in an epic boon. */
      epicBoonInterval: number;
    }
  }
}

export {};
