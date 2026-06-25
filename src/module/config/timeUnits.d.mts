/**
 * Time unit config domain (Seam A). `CONFIG.DND5E.timeUnits`.
 *
 * Each entry is a `TimeUnitConfiguration` (a `UnitConfiguration` minus `abbreviation`/`type`,
 * plus combat/option/timeComponent flags).
 */

declare global {
  namespace dnd5e.types {
    namespace TimeUnit {
      /** Core time units. */
      interface DefaultTypes {
        turn: true;
        round: true;
        second: true;
        minute: true;
        hour: true;
        day: true;
        week: true;
        month: true;
        year: true;
      }

      /** Downstream merge point. */
      interface OverrideTypes extends Record<string, boolean | never> {}

      type Types = dnd5e.types.MergeOverrideDefinition<DefaultTypes, OverrideTypes>;
      type TypeKey = dnd5e.types.ExtractKeys<Types>;

      /** Shape of each `CONFIG.DND5E.timeUnits[key]` entry. */
      interface Config {
        /** Localized label for the unit. */
        label: string;
        /** Multiplier used to convert between various units. */
        conversion: number;
        /**
         * Localization path for counted plural forms in various unit display modes.
         * Only necessary if non-supported unit or using a non-standard name for a supported unit.
         */
        counted?: string;
        /**
         * Unit formatting value as supported by javascript's internationalization system:
         * https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers. Only required if
         * the formatting name doesn't match the unit key.
         */
        formattingUnit?: string;
        /**
         * Is this a combat-specific time unit?
         * @defaultValue false
         */
        combat?: boolean;
        /**
         * Should this be available when users can select from a list of units?
         * @defaultValue true
         */
        option?: boolean;
        /** Mapping of this unit to a core calendar `TimeComponent`. */
        timeComponent?: keyof foundry.data.CalendarData.TimeComponents;
      }
    }

    interface DND5EConfig {
      timeUnits: { [K in dnd5e.types.TimeUnit.TypeKey]: dnd5e.types.TimeUnit.Config };
    }
  }
}

export {};
