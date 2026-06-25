/**
 * Passive-skill scoring config. `CONFIG.DND5E.skillPassive`.
 *
 * Scalar/object domain: base passive score and the amount passive scores shift on
 * advantage/disadvantage. Not a keyed record, so no Seam-A namespace.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      /**
       * Base passive score and the amount by which the passive skill scores are modified when that skill has
       * advantage or disadvantage.
       */
      skillPassive: {
        /** Base passive score (default 10). */
        base: number;
        /** Amount added/subtracted when the skill has advantage/disadvantage (default 5). */
        modifier: number;
      };
    }
  }
}

export {};
