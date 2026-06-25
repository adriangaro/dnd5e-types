/**
 * Weapon-type → attack-type map (map-style helper). `CONFIG.DND5E.weaponTypeMap`.
 *
 * Maps `DND5E.weaponTypes` keys to `DND5E.attackTypes` keys (`"melee"` | `"ranged"`).
 * Typed by the expandable `WeaponProficiency.MeleeRangedMap` relationship layer (populated defaults).
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      weaponTypeMap: dnd5e.types.WeaponProficiency.MeleeRangedMap;
    }
  }
}

export {};
