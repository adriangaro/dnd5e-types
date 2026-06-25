/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/item/fields/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.item.fields {
      interface ItemTypeData {
        /** Primary type for this item. */
        value: string;
        /** Secondary type within the primary type. */
        subtype: string;
        /** Base item identifier. */
        baseItem: string;
      }

      interface SpellcastingFieldData {
        /** Spellcasting progression (e.g. full, half, pact). */
        progression: dnd5e.types.Spellcasting.Progression.TypeKey;
        /** Ability used for spell attacks and save DCs. */
        ability: dnd5e.types.Ability.TypeKey | '';
        preparation: {
          formula: string; // Formula used to calculate max prepared spells, if a prepared caster.
        };
      }

  }
}

export {};
