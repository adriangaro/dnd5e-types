/**
 * Valid item properties per item type. `CONFIG.DND5E.validProperties`.
 *
 * Map-style domain: keys are item types, each value is a `Set` of the item-property keys
 * (`dnd5e.types.ItemProperty.TypeKey`) allowed for that item type. Not Seam-A expandable
 * on its own — downstream widens via `ItemProperty.OverrideTypes` and mutates the Sets.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      validProperties: Partial<Record<globalThis.Item.SubType, Set<dnd5e.types.ItemProperty.TypeKey>>>;
    }
  }
}

export {};
