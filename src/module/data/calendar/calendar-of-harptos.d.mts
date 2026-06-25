/**
 * Extension of the core calendar with support for festivals days and extra formatters.
 *
 * Forgotten Realms calendar: extends {@link CalendarData5e} with a `festivals` array and festival-day
 * aware month/day formatting.
 */

import CalendarData5e from "./calendar-data.mjs";

/**
 * Extension of the core calendar with support for festivals days and extra formatters.
 */
declare class CalendarHarptos extends CalendarData5e {
  static override defineSchema(): foundry.data.CalendarData.Schema & {
    festivals: foundry.data.fields.ArrayField<
      foundry.data.fields.SchemaField<{
        name: foundry.data.fields.StringField<{ required: true }>;
        month: foundry.data.fields.NumberField<{ required: true; nullable: false; min: 1; integer: true }>;
        day: foundry.data.fields.NumberField<{ required: true; nullable: false; min: 1; integer: true }>;
      }>
    >;
  };

  festivals: dnd5e.types.data.calendar.CalendarConfigHarptosFestival[];

  /** Find the festival day (if any) for the given time. */
  findFestivalDay(
    time?: dnd5e.types.Calendar.TimeArg,
  ): dnd5e.types.data.calendar.CalendarConfigHarptosFestival | null;
}

declare const CALENDAR_OF_HARPTOS: foundry.data.CalendarData.CreateData & {
  festivals: dnd5e.types.data.calendar.CalendarConfigHarptosFestival[];
};

export { CalendarHarptos, CALENDAR_OF_HARPTOS };
