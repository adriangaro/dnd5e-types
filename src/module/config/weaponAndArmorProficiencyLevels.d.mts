/**
 * Weapon and armor item proficiency levels. `CONFIG.DND5E.weaponAndArmorProficiencyLevels`.
 *
 * Label-map keyed by numeric proficiency level (0 = not proficient, 1 = proficient).
 * Fixed numeric keys; not Seam-A expandable.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      weaponAndArmorProficiencyLevels: Record<0 | 1, string>;
    }
  }
}

export {};
