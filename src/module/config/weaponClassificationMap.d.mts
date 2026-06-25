/**
 * Weapon-type -> attack-classification map. `CONFIG.DND5E.weaponClassificationMap`.
 *
 * Helper map between `DND5E.weaponTypes` and `DND5E.attackClassifications`; unlisted
 * types default to the "weapon" classification. Empty by default. Not Seam-A expandable.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      weaponClassificationMap: Partial<Record<dnd5e.types.WeaponType.TypeKey, dnd5e.types.AttackClassification.TypeKey>>;
    }
  }
}

export {};
