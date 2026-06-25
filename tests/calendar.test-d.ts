/**
 * Calendars: `CalendarData5e` extends the core `CalendarData` with dnd5e helpers; `CalendarHarptos`
 * adds the `festivals`/`findFestivalDay` surface; all three presets and their config-data objects
 * are exposed under `dnd5e.dataModels.calendar`.
 */

import type { Expect, Equal, Extends } from "./_assert.ts";

declare const harptos: dnd5e.dataModels.calendar.CalendarHarptos;

{
  type Cal = dnd5e.dataModels.calendar.CalendarData5e;
  type _isCalendar = Expect<Extends<Cal, foundry.data.CalendarData<foundry.data.CalendarData.TimeComponents>>>;
  type _sunrise = Expect<Equal<ReturnType<Cal["sunrise"]>, number>>;

  type _festivals = Expect<
    Equal<typeof harptos.festivals, dnd5e.types.data.calendar.CalendarConfigHarptosFestival[]>
  >;
  type _find = Expect<
    Equal<
      ReturnType<dnd5e.dataModels.calendar.CalendarHarptos["findFestivalDay"]>,
      dnd5e.types.data.calendar.CalendarConfigHarptosFestival | null
    >
  >;

  // config-data objects are CalendarData create data
  type _greyhawk = Expect<Extends<typeof dnd5e.dataModels.calendar.CALENDAR_OF_GREYHAWK, foundry.data.CalendarData.CreateData>>;
}
