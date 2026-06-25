/**
 * Calendar UI config (single object). `CONFIG.DND5E.calendar`.
 *
 * Configuration information for the calendar HUD (`CalendarHUDConfiguration`):
 * the HUD application, the selectable calendars, and the date/time formatters.
 *
 * Reuses the generated `dnd5e.types.core` interfaces (CalendarHUDConfiguration /
 * CalendarOption / CalendarTimeFormatter) for the precise field shapes.
 */

declare global {
  namespace dnd5e.types {
    namespace Calendar {
      /** A selectable calendar option (`CalendarOption extends FormSelectOption`). */
      type Option = dnd5e.types.core.CalendarOption;
      /** A date/time formatter option (`CalendarTimeFormatter extends FormSelectOption`). */
      type TimeFormatter = dnd5e.types.core.CalendarTimeFormatter;
      /** Shape of `CONFIG.DND5E.calendar` (`CalendarHUDConfiguration`). */
      type Config = dnd5e.types.core.CalendarHUDConfiguration;
    }

    interface DND5EConfig {
      calendar: dnd5e.types.Calendar.Config;
    }
  }
}

export {};
