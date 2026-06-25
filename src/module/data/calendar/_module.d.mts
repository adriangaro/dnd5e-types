/**
 * Runtime API fragment for `dnd5e.dataModels.calendar` (`CalendarData5e` + the three preset calendars
 * and their config data objects).
 *
 * Each class is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.calendar {
    const CalendarData5e: typeof import("../calendar/calendar-data.mjs").default;
    type CalendarData5e = import("../calendar/calendar-data.mjs").default;

    const CalendarHarptos: typeof import("../calendar/calendar-of-harptos.mjs").CalendarHarptos;
    type CalendarHarptos = import("../calendar/calendar-of-harptos.mjs").CalendarHarptos;
    const CALENDAR_OF_HARPTOS: typeof import("../calendar/calendar-of-harptos.mjs").CALENDAR_OF_HARPTOS;

    const CalendarGreyhawk: typeof import("../calendar/calendar-of-greyhawk.mjs").CalendarGreyhawk;
    type CalendarGreyhawk = import("../calendar/calendar-of-greyhawk.mjs").CalendarGreyhawk;
    const CALENDAR_OF_GREYHAWK: typeof import("../calendar/calendar-of-greyhawk.mjs").CALENDAR_OF_GREYHAWK;

    const CalendarKhorvaire: typeof import("../calendar/calendar-of-khorvaire.mjs").CalendarKhorvaire;
    type CalendarKhorvaire = import("../calendar/calendar-of-khorvaire.mjs").CalendarKhorvaire;
    const CALENDAR_OF_KHORVAIRE: typeof import("../calendar/calendar-of-khorvaire.mjs").CALENDAR_OF_KHORVAIRE;
  }
}

export {};
