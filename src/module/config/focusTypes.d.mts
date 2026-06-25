/**
 * Spellcasting focus types config domain (Seam A). `CONFIG.DND5E.focusTypes`.
 *
 * Keyed record of `SpellcastingFocusConfiguration` (a label and a map of focus item IDs/UUIDs).
 */

declare global {
  namespace dnd5e.types {
    namespace FocusType {
      /** Core spellcasting focus categories. */
      interface DefaultTypes {
        arcane: true;
        druidic: true;
        holy: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.focusTypes[key]` entry (SpellcastingFocusConfiguration). */
      interface Config {
        /** Localized label for this focus category. */
        label: string;
        /** Item IDs or UUIDs for example foci of this category, keyed by an arbitrary id. */
        itemIds: Record<string, string>;
      }
    }

    interface DND5EConfig {
      focusTypes: { [K in dnd5e.types.FocusType.TypeKey]: dnd5e.types.FocusType.Config };
    }
  }
}

export {};
