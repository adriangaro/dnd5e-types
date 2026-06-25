/**
 * Volume unit config domain (Seam A). `CONFIG.DND5E.volumeUnits`.
 */

declare global {
  namespace dnd5e.types {
    namespace VolumeUnit {
      /** The default volume measurement units. */
      interface DefaultTypes {
        cubicFoot: true;
        liter: true;
      }

      /** Downstream merge point — add `{ myUnit: true }` here. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.volumeUnits[key]` entry (UnitConfiguration). */
      interface Config {
        /** Localized label for the unit. */
        label: string;
        /** Localized abbreviation for the unit. */
        abbreviation: string;
        /** Multiplier used to convert between various units. */
        conversion: number;
        /** Whether this is an "imperial" or "metric" unit. */
        type: "imperial" | "metric";
        /** Localization path for counted plural forms in various unit display modes. Only necessary if non-supported unit or using a non-standard name for a supported unit. */
        counted?: string;
        /** Unit formatting value as supported by javascript's internationalization system: https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers. Only required if the formatting name doesn't match the unit key. */
        formattingUnit?: string;
      }
    }

    interface DND5EConfig {
      volumeUnits: { [K in dnd5e.types.VolumeUnit.TypeKey]: dnd5e.types.VolumeUnit.Config };
    }
  }
}

export {};
