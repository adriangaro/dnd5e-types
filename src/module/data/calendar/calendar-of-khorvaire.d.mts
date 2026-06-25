/**
 * Extension of the core calendar with support for extra formatters.
 *
 * Eberron (Khorvaire) calendar: extends {@link CalendarData5e} with Khorvaire-specific month/day
 * formatters.
 */

import CalendarData5e from "./calendar-data.mjs";

declare class CalendarKhorvaire extends CalendarData5e {}

/** Config data object for the Common Calendar of Khorvaire. */
declare const CALENDAR_OF_KHORVAIRE: foundry.data.CalendarData.CreateData;

export { CalendarKhorvaire, CALENDAR_OF_KHORVAIRE };
