/**
 * Standard dice spread available for things like damage. `CONFIG.DND5E.dieSteps`.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      /** Standard dice faces, e.g. `[4, 6, 8, 10, 12, 20, 100]`. */
      dieSteps: number[];
    }
  }
}

export {};
