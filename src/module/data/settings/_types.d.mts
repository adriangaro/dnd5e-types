/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/settings/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.settings {
      interface BastionSettingData {
      button: boolean; // Display the "Advance Bastion Turn" button in the interface for GM users.
      duration: number; // Time between bastion turns in days.
      enabled: boolean; // Display bastion tab on sheets of characters that are 5th level or higher.
      }

      interface CalendarConfigSettingData {
      enabled: boolean; // Enable the calendar system for all users.
      dailyRecovery: ""|"calendar"|"manual"; // How daily recovery uses are handled. A blank value is automatic based on the calendar being enabled.
      }

      interface CalendarPreferencesSettingData {
      formatters: {
        date: string; // Formatter used to display the date (left position).
        time: string; // Formatter used to display the time (right position).
      };
      visible: boolean; // Display the calendar UI.
      }

      interface CompendiumSourceConfig5e {
      packages: {
        world: CompendiumSourcePackageConfig5e;
        system: CompendiumSourcePackageConfig5e;
        modules: Record<string, CompendiumSourcePackageConfig5e>;
      };
      packs: {
        items: CompendiumSourcePackGroup5e;
        actors: CompendiumSourcePackGroup5e;
      };
      }

      interface CompendiumSourcePackageConfig5e {
      title: string; // The package title.
      id: string; // The package ID.
      count: number; // The number of packs provided by this package.
      checked: boolean; // True if all the packs are included.
      indeterminate: boolean; // True if only some of the packs are included.
      active: boolean; // True if the package is currently selected.
      filter: string; // The normalized package title for filtering.
      }

      interface CompendiumSourcePackGroup5e {
      checked: boolean; // True if all members of this pack group are included.
      indeterminate: boolean; // True if only some of this pack group are included.
      entries: CompendiumSourcePackConfig5e[];
      }

      interface CompendiumSourcePackConfig5e {
      title: string; // The pack title.
      id: string; // The pack ID.
      checked: boolean; // True if the pack is included.
      }

      type EncounterPlacementSettingData = "none"|"createCombatants"|"rollInitiative";

      interface PrimaryPartySettingData {
      actor: globalThis.Actor.Implementation | null; // Group actor representing the primary party.
      }

      interface TransformationSettingData {
      effects: Set<string>;
      keep: Set<string>;
      merge: Set<string>;
      minimumAC?: string; // Formula for minimum armor class for transformed creature.
      other: Set<string>;
      preset: string | null;
      spellLists?: Set<string>; // Spell lists to keep if actor has matching item.
      tempFormula?: string; // Formula for temp HP that will be added during transformation.
      transformTokens?: boolean;
      }

  }
}

export {};
