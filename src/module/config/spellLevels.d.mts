/**
 * Spell-level config domain (Seam A). `CONFIG.DND5E.spellLevels`.
 *
 * Valid spell levels 0-9 mapped to localized labels. Numeric-string keys; expandable.
 */

declare global {
  namespace dnd5e.types {
    namespace SpellLevel {
      /** Spell levels 0 (cantrip) through 9. */
      interface DefaultTypes {
        0: true;
        1: true;
        2: true;
        3: true;
        4: true;
        5: true;
        6: true;
        7: true;
        8: true;
        9: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string | number, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;
    }

    interface DND5EConfig {
      spellLevels: { [K in dnd5e.types.SpellLevel.TypeKey]: string };
    }
  }
}

export {};
