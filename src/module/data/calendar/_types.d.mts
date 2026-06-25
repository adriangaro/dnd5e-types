/**
 * Hand-managed type defs (originally seeded from _research/dnd5e/module/data/calendar/_types.mjs). Edit directly — the JSDoc generator is retired.
 */

declare global {
  namespace dnd5e.types.data.calendar {
      interface CalendarFormattingContext {
      y: string; // Year number.
      yyyy: string; // Year number with at least 4 digits.
      b: string; // Month abbreviation.
      B: string; // Full month name.
      mm: string; // Month number with at least 2 digits.
      d: string; // Day of month.
      dd: string; // Day of month with at least 2 digits.
      D: string; // Ordinal day of month (e.g. 1st, 2nd).
      j: string; // Day of year with at least 3 digits.
      w: string; // Day number in week.
      H: string; // Hours with at least 2 digits.
      M: string; // Minutes with at least 2 digits.
      S: string; // Seconds with at least 2 digits.
      }

      interface CalendarTimeDeltas {
      midnights: number; // Number of times midnight has been passed during a time change.
      middays: number; // Number of times noon has been passed during a time change.
      sunrises: number; // Number of sunrises that occurred during a time change.
      sunsets: number; // Number of sunsets that occurred during a time change.
      }

      interface TimePassageData extends CalendarTimeDeltas {
      worldTime: number; // Timecode for world after time as passed.
      deltaTime: number; // Change to the timecode that occurred.
      }

      interface CalendarConfigHarptosFestival {
      name: string; // The full name of the festival.
      month: number; // The ordinal month in which this festival occurs.
      day: number; // The day of the month in which this festival occurs.
      }

  }
}

export {};
