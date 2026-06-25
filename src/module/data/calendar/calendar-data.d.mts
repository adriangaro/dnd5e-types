/**
 * Extension of the core calendar with extra formatters.
 *
 * Extension of the core `foundry.data.CalendarData` with dnd5e day/night progress helpers, a set of
 * static formatter functions (approximate date/time, hours-minutes, month-day, …) and the
 * time-passage pipeline (`onUpdateWorldTime` → `onTimePassage` → `handleTimePassage`).
 */

declare global {
  namespace dnd5e.types.Calendar {
    /** Core calendar time components. */
    type TimeComponents = foundry.data.CalendarData.TimeComponents;
    /** A configured calendar instance (any component shape). */
    type AnyCalendar = foundry.data.CalendarData<foundry.data.CalendarData.TimeComponents>;
    /** A time argument: a raw timecode or decomposed components. */
    type TimeArg = number | foundry.data.CalendarData.TimeComponents;
  }
}

declare class CalendarData5e<
  Components extends foundry.data.CalendarData.TimeComponents = foundry.data.CalendarData.TimeComponents,
> extends foundry.data.CalendarData<Components> {
  /* -------------------------------------------- */
  /*  Calendar Helper Methods                     */
  /* -------------------------------------------- */

  /** Decimal hours since the start of the day. */
  static hoursOfDay(time?: dnd5e.types.Calendar.TimeArg, calendar?: dnd5e.types.Calendar.AnyCalendar): number;

  /** Number of hours between sunrise and sunset. */
  daylightHours(time?: dnd5e.types.Calendar.TimeArg): number;

  /** Progress through the day period (0 = sunrise, 1 = sunset). */
  progressDay(time?: dnd5e.types.Calendar.TimeArg): number;

  /** Progress through the night period (0 = sunset, 1 = sunrise). */
  progressNight(time?: dnd5e.types.Calendar.TimeArg): number;

  /** Sunrise time, in hours. */
  sunrise(time?: dnd5e.types.Calendar.TimeArg): number;

  /** Sunset time, in hours. */
  sunset(time?: dnd5e.types.Calendar.TimeArg): number;

  /**
   * Set the date to a specific year, month, or day. Any values not provided will remain the same.
   * @param components
   * @param components.year   Visible year (with `yearZero` added in).
   * @param components.month  Index of month.
   * @param components.day    Day within the month.
   */
  jumpToDate(components: { year?: number; month?: number; day?: number }): Promise<void>;

  /* -------------------------------------------- */
  /*  Formatter Functions                         */
  /* -------------------------------------------- */

  /** Prepared date parts passed to the localization. */
  static dateFormattingParts(
    calendar: dnd5e.types.Calendar.AnyCalendar,
    components: dnd5e.types.Calendar.TimeComponents,
  ): dnd5e.types.data.calendar.CalendarFormattingContext;

  /** Format the date approximately by season (e.g. "Early Spring"). */
  static formatApproximateDate(
    calendar: dnd5e.types.Calendar.AnyCalendar,
    components: dnd5e.types.Calendar.TimeComponents,
    options?: object,
  ): string;

  /** Format the time approximately (e.g. "Dawn", "Noon", "Night"). */
  static formatApproximateTime(
    calendar: dnd5e.types.Calendar.AnyCalendar,
    components: dnd5e.types.Calendar.TimeComponents,
    options?: object,
  ): string;

  /** Format the time including hours and minutes. */
  static formatHoursMinutes(
    calendar: dnd5e.types.Calendar.AnyCalendar,
    components: dnd5e.types.Calendar.TimeComponents,
    options?: object,
  ): string;

  /** Format the time including hours, minutes, and seconds. */
  static formatHoursMinutesSeconds(
    calendar: dnd5e.types.Calendar.AnyCalendar,
    components: dnd5e.types.Calendar.TimeComponents,
    options?: object,
  ): string;

  /** Format the date using a localization key and the default formatting parts. */
  static formatLocalized(
    localizationKey: string,
    calendar: dnd5e.types.Calendar.AnyCalendar,
    components: dnd5e.types.Calendar.TimeComponents,
    options?: object,
  ): string;

  /** Format the date including month and day. */
  static formatMonthDay(
    calendar: dnd5e.types.Calendar.AnyCalendar,
    components: dnd5e.types.Calendar.TimeComponents,
    options?: object,
  ): string;

  /** Format the date including month, day, and year. */
  static formatMonthDayYear(
    calendar: dnd5e.types.Calendar.AnyCalendar,
    components: dnd5e.types.Calendar.TimeComponents,
    options?: object,
  ): string;

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** Inject dnd5e time deltas into the update options (`options.dnd5e.deltas`). */
  static onUpdateWorldTime(worldTime: number, deltaTime: number, options: object, userId: string): void;

  /**
   * Respond to time changes and trigger the handling of time passage. This hook is split off from
   * `onUpdateWorldTime` and registered late to allow modules to modify the time deltas with their
   * own entries before time passage is handled.
   */
  static onTimePassage(worldTime: number, deltaTime: number, options: object, userId: string): void;

  /** Trigger recovery for world actors based on the passage of time. */
  static handleTimePassage(timePassageData: dnd5e.types.data.calendar.TimePassageData): Promise<void>;

  /** Build the chat message shown for a time-passage event. */
  static generateTimePassageMessage(
    timePassageData: dnd5e.types.data.calendar.TimePassageData,
  ): string | void;
}

declare abstract class AnyCalendarData5e extends CalendarData5e<any> {
  constructor(...args: any[]);
}

declare namespace CalendarData5e {
  interface Any extends AnyCalendarData5e {}
  interface AnyConstructor extends fvttUtils.Identity<typeof AnyCalendarData5e> {}
}

export default CalendarData5e;
