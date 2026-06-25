/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/spellcasting/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.spellcasting {
      interface SpellcastingModelData {
      img: string; // The icon to use if this spellcasting method is favorited.
      label: string; // The human-readable label.
      order: number; // The ordering of this method on an actor sheet's spells tab, ascending.
      type: SpellcastingMethodType; // Types of slots created by this method.
      }

      /** "none" - No spell slots. "single" - Spell slots of a single level only. "multi" - Spell slots of multiple levels. */
      type SpellcastingMethodType = "none"|"single"|"multi";

      interface SlotSpellcastingData {
      cantrips: boolean; // Whether this spellcasting method includes cantrips.
      exclusive: { // Exclusivity options.
        slots: boolean; // Whether the slots provided by this spellcasting method may only be used to cast spells that use this spellcasting method.
        spells: boolean; // Whether spells that use this spellcasting method may only be cast with slots provided by this spellcasting method.
      };
      prepares: boolean; // Whether spells using this method are variably available for casting. In 2024 this term was unified to 'prepares', but 2014 uses different nomenclature for different classes.
      progression: Record<string, SpellcastingProgression5e>; // Spell slot progressions available for this method. (JSDoc references the undefined typedef `SlotSpellcastingProgressionData`; the actual `progression` SchemaField in SlotSpellcasting.defineSchema is `{ divisor, label, roundUp }`, i.e. SpellcastingProgression5e.)
      }

      interface SpellcastingProgression5e {
      divisor: number; // How much this progression mode contributes to the base progression of the spellcasting method.
      label: string; // The human-readable label.
      roundUp?: boolean; // Whether to round up or down when determining contribution.
      }

      interface SingleLevelSpellcastingData {
      table: SpellcastingTableSingle5e; // The spell slot progression table.
      }

      interface MultiLevelSpellcasting {
      table: SpellcastingTable5e; // The spell slot progression table.
      }

      type SpellcastingTable5e = number[][];

      type SpellcastingTableSingle5e = Record<number, SpellcastingTableEntry5e>;

      interface SpellcastingTableEntry5e {
      slots: number; // The number of slots available.
      level: number; // The level of the slots.
      }

  }
}

export {};
