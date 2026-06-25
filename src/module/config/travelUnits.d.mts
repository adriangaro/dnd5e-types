/**
 * Travel speed unit config domain (Seam A). `CONFIG.DND5E.travelUnits`.
 *
 * Units for measuring travel speed; the formatting unit is combined with `-per-hour`
 * or `-per-day` for the final `Intl.NumberFormat` unit.
 */

declare global {
  namespace dnd5e.types {
    namespace TravelUnit {
      /** The default travel speed units. */
      interface DefaultTypes {
        mph: true;
        kph: true;
      }

      /** Downstream merge point — add `{ myUnit: true }` here. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.travelUnits[key]` entry (TravelUnitConfiguration). */
      interface Config {
        /** Localized label for the unit. */
        label: string;
        /** Abbreviated form when using days as the travel period. */
        abbreviationDay: string;
        /** Abbreviated form when using hours as the travel period. */
        abbreviationHour: string;
        /** Multiplier used to convert between various units. */
        conversion: number;
        /** Whether this is an "imperial" or "metric" unit. */
        type: "imperial" | "metric";
        /**
         * Localization path for counted plural forms in various unit display modes.
         * Only necessary if non-supported unit or using a non-standard name for a supported unit.
         */
        counted?: string;
        /**
         * Unit formatting value as supported by javascript's internationalization system:
         * https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers. Only
         * required if the formatting name doesn't match the unit key.
         */
        formattingUnit?: string;
      }
    }

    interface DND5EConfig {
      travelUnits: { [K in dnd5e.types.TravelUnit.TypeKey]: dnd5e.types.TravelUnit.Config };
    }
  }
}

export {};
