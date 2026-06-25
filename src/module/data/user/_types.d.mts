/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/user/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.user {
      interface UserSystemFlagsData {
      awardDestinations: Set<string>; // Saved targets from previous use of /award command.
      creation: {
        scrollExplanation: string; // Default explanation mode for spell scrolls.
      };
      sheetPrefs: Record<string, SheetPreferences5e>; // The User's sheet preferences.
      }

      interface SheetPreferences5e {
      width: number|null; // The preferred width of the sheet.
      height: number|null; // The preferred height of the sheet.
      tabs: Record<string, TabPreferences5e>; // The User's tab preferences.
      }

      interface TabPreferences5e {
      collapseSidebar?: boolean; // Whether this tab should have the sidebar collapsed.
      /** Whether to group items by type. Note: the runtime JSDoc declares {boolean} but the schema field is a StringField — string is correct per the implementation. */
      group?: string;
      sort?: "a" | "m" | "p"; // The item sort mode.
      }

  }
}

export {};
