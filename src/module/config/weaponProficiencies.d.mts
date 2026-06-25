/**
 * Weapon proficiency category config domain (Seam A, label map).
 * `CONFIG.DND5E.weaponProficiencies`.
 *
 * The `WeaponProficiency` namespace itself is declared in `_stubs.d.mts`; this file only
 * adds the `CONFIG.DND5E` funnel entry (general weapon categories: simple / martial).
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      weaponProficiencies: { [K in dnd5e.types.WeaponProficiency.TypeKey]: string };
    }
  }
}

export {};
