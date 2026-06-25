/**
 * Valid units of measure for movement distances (Seam A). `CONFIG.DND5E.movementUnits`.
 */

declare global {
  namespace dnd5e.types {
    namespace MovementUnit {
      /** Default distance units (imperial + metric). */
      interface DefaultTypes {
        ft: true;
        mi: true;
        m: true;
        km: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.movementUnits[key]` entry (`MovementUnitConfiguration`). */
      interface Config {
        /** Localized label for the unit. */
        label: string;
        /** Localized abbreviation for the unit. */
        abbreviation: string;
        /** Multiplier used to convert between units. */
        conversion: number;
        /** Localized label for a template size (e.g. 50-foot). */
        template: string;
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
        /** Whether this is an imperial or metric unit. */
        type: "imperial" | "metric";
        /** Whether the distance is per-round or per-day when used in the context of overland travel. */
        travelResolution?: "day" | "round";
      }
    }

    interface DND5EConfig {
      movementUnits: { [K in dnd5e.types.MovementUnit.TypeKey]: dnd5e.types.MovementUnit.Config };
    }
  }
}

export {};
