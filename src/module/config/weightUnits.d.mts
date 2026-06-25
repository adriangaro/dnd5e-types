/**
 * Weight unit config domain (Seam A). `CONFIG.DND5E.weightUnits`.
 *
 * The valid units for measurement of weight. Downstream modules add a unit in one line:
 *   declare global { namespace dnd5e.types.WeightUnit { interface OverrideTypes { st: true } } }
 */

declare global {
  namespace dnd5e.types {
    namespace WeightUnit {
      interface DefaultTypes {
        lb: true;
        tn: true;
        kg: true;
        Mg: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.weightUnits[key]` entry (`UnitConfiguration`). */
      interface Config {
        /** Localized label for the unit. */
        label: string;
        /** Localized abbreviation for the unit. */
        abbreviation: string;
        /** Multiplier used to convert between various units. */
        conversion: number;
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
        /** Whether this is an `"imperial"` or `"metric"` unit. */
        type: "imperial" | "metric";
      }
    }

    interface DND5EConfig {
      weightUnits: { [K in dnd5e.types.WeightUnit.TypeKey]: dnd5e.types.WeightUnit.Config };
    }
  }
}

export {};
