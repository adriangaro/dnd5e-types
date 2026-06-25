/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/journal/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.journal {
      interface ClassJournalPageSystemData {
      item: string; // UUID of the class item included.
      description: {
        value: string; // Introductory description for the class.
        additionalHitPoints: string; // Additional text displayed beneath the hit points section.
        additionalTraits: string; // Additional text displayed beneath the traits section.
        additionalEquipment: string; // Additional text displayed beneath the equipment section.
        subclass: string; // Introduction to the subclass section.
      };
      style: string; // Force the page style to use modern or legacy formatting, rather than what is specified by the class.
      subclassHeader: string; // Subclass header to replace the default.
      subclassItems: Set<string>; // UUIDs of all subclasses to display.
      }

      interface MapJournalPageSystemData {
      code: string; // Code for the location marker on the map.
      }

      interface RuleJournalPageSystemData {
      tooltip: string; // Content to display in tooltip in place of page's text content.
      type: dnd5e.types.RuleType.TypeKey; // Type of rule represented. Should match an entry defined in `CONFIG.DND5E.ruleTypes`.
      }

      interface SpellsJournalPageSystemData {
      type: dnd5e.types.SpellListType.TypeKey; // Type of spell list (e.g. class, subclass, race, etc.).
      identifier: string; // Common identifier that matches the associated type (e.g. bard, cleric).
      grouping: string; // Default grouping mode.
      description: {
        value: string; // Description to display before spell list.
      };
      spells: Set<string>; // UUIDs of spells to display.
      unlinkedSpells: UnlinkedSpellConfiguration[]; // Unavailable spells that are entered manually.
      }

      /** Data needed to display spells that aren't able to be linked (outside SRD & current module). */
      interface UnlinkedSpellConfiguration {
      _id: string; // Unique ID for this entry.
      identifier: string; // Identifier of this spell.
      name: string; // Name of the spell.
      system: {
        level: number; // Spell level.
        school: dnd5e.types.SpellSchool.TypeKey; // Spell school.
      };
      source: {
        book: string; // Book/publication where the spell originated.
        page: string; // Page or section where the spell can be found.
        custom: string; // Fully custom source label.
        uuid: string; // UUID of the spell, if available in another module.
      };
      }

      interface SubclassJournalPageSystemData {
      item: string; // UUID of the subclass item included.
      description: {
        value: string; // Introductory description for the subclass.
      };
      style: string; // Force the page style to use modern or legacy formatting, rather than what is specified by the subclass.
      }

  }
}

export {};
