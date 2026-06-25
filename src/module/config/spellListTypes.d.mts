/**
 * Spell-list type config domain (Seam A). `CONFIG.DND5E.spellListTypes`.
 *
 * Types of spell lists (class, subclass, background, race, other). Label-map; expandable.
 */

declare global {
  namespace dnd5e.types {
    namespace SpellListType {
      /** Core spell-list categories. */
      interface DefaultTypes {
        class: true;
        subclass: true;
        background: true;
        race: true;
        other: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      spellListTypes: { [K in dnd5e.types.SpellListType.TypeKey]: string };
    }
  }
}

export {};
