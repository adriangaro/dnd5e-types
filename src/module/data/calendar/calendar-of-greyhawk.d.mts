/**
 * Extension of the core calendar with support for extra formatters.
 *
 * Greyhawk calendar: extends {@link CalendarData5e} with Greyhawk-specific month/day formatters.
 */

import CalendarData5e from "./calendar-data.mjs";

declare class CalendarGreyhawk extends CalendarData5e {}

declare const CALENDAR_OF_GREYHAWK: foundry.data.CalendarData.CreateData;

export { CalendarGreyhawk, CALENDAR_OF_GREYHAWK };
