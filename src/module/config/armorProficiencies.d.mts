/**
 * Armor proficiency categories (Seam A, label-map). `CONFIG.DND5E.armorProficiencies`.
 *
 * The `ArmorProficiency` namespace (DefaultTypes/Types/TypeKey) is declared in
 * `_stubs.d.mts`; this file only adds the `CONFIG.DND5E` funnel entry.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      /** Localized armor proficiency labels keyed by category code. */
      armorProficiencies: { [K in dnd5e.types.ArmorProficiency.TypeKey]: string };
    }
  }
}

export {};
