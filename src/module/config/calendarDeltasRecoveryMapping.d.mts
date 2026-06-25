/**
 * Mapping of calendar time deltas to limited-use recovery periods.
 * `CONFIG.DND5E.calendarDeltasRecoveryMapping`.
 */

declare global {
  namespace dnd5e.types {
    interface DND5EConfig {
      /**
       * Map from a calendar time-delta key (e.g. `"midnights"`) to a recovery
       * period key (e.g. `"day"`). Ordering determines selection priority.
       */
      calendarDeltasRecoveryMapping: Map<keyof dnd5e.types.data.calendar.CalendarTimeDeltas, dnd5e.types.LimitedUsePeriod.TypeKey>;
    }
  }
}

export {};
