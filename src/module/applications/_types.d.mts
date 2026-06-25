/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/applications/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.applications {
      interface AwardOptions {
      currency: Record<string, number>|null; // Amount of each currency to award.
      each: boolean; // Distribute full award to each destination, rather than dividing it among the destinations.
      savedDestinations: Set<string>; // Set of IDs for previously selected destinations.
      xp: number|null; // Amount of experience points to award.
      }

      interface CurrencyUpdateOptions {
      exact?: boolean; // @default true — Prioritize deducting the requested denomination first.
      makeChange?: boolean; // @default true — Convert higher denominations to fulfill the request if needed.
      priority?: "high"|"low"; // @default "low" — Prioritize higher denominations before lower, or vice-versa.
      recursive?: boolean; // @default false — Deduct currency from containers as well as the base Actor. TODO
      }

      interface CompendiumBrowserConfiguration extends foundry.applications.api.ApplicationV2.Configuration {
      filters: {locked: CompendiumBrowserFilters, initial: CompendiumBrowserFilters}; // Filters to set to start. Locked filters won't be able to be changed by the user. Initial filters will be set to start but can be changed.
      hint: string|null; // Hint displayed in the interface.
      selection: CompendiumBrowserSelectionConfiguration; // Configuration used to define document selections.
      }

      interface CompendiumBrowserSelectionConfiguration {
      min: number|null; // Minimum number of documents that must be selected.
      max: number|null; // Maximum number of documents that must be selected.
      }

      interface CompendiumBrowserFilters {
      exclusive?: boolean; // When used in locked filters, locks all choices within filter categories that have explicit values, preventing additional selections. Categories without values remain unlocked.
      documentClass?: string; // Document type to fetch (e.g. Actor or Item).
      types?: Set<string>; // Individual document subtypes to filter upon (e.g. "loot", "class", "npc").
      additional?: object; // Additional type-specific filters applied.
      arbitrary?: dnd5e.types.core.FilterDescription[]; // Additional arbitrary filters to apply, not displayed in the UI. Only available as part of locked filters.
      name?: string; // A substring to filter by Document name.
      }

      /** Filter definition object for additional filters in the Compendium Browser. */
      interface CompendiumBrowserFilterDefinitionEntry {
      label: string; // Localizable label for the filter.
      type: "boolean"|"range"|"set"; // Type of filter control to display.
      config: object; // Type-specific configuration data. Shape varies by `type` (boolean/range/set).
      createFilter?: CompendiumBrowserFilterCreateFilters; // Method that can be called to create filters.
      }

      /**
       * Method that can be called to create filters for a Compendium Browser filter definition entry.
       * @param filters     Array of filters to be applied that should be mutated.
       * @param value       Value of the filter.
       * @param definition  Definition for this filter.
       */
      type CompendiumBrowserFilterCreateFilters = (
        filters: dnd5e.types.core.FilterDescription[],
        value: any,
        definition: CompendiumBrowserFilterDefinitionEntry
      ) => void;

      type CompendiumBrowserFilterDefinition = Map<string, CompendiumBrowserFilterDefinitionEntry>;

      interface CompendiumBrowserTabDescriptor5e extends dnd5e.types.applications.api.SheetTabDescriptor5e {
      documentClass: string; // The class of Documents this tab contains.
      types?: string[]; // The sub-types of Documents this tab contains, otherwise all types of the Document class are assumed.
      advanced?: boolean; // Is this tab only available in the advanced browsing mode.
      }

      /** Description for a single part of a property attribution. */
      interface PropertyAttributionDescription {
      label: string; // Descriptive label that will be displayed. If the label is in the form of an @ property, the system will try to turn it into a human-readable label.
      type: string; // Active effect application type.
      value: number; // Value of this step.
      document?: globalThis.ActiveEffect.Implementation; // Active effect applying this attribution, if any.
      }

  }
}

export {};
