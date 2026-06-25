/**
 * World/client setting models for the calendar system
 * (`game.settings.get("dnd5e", "calendarConfig" | "calendarPreferences")`).
 */

declare global {
  namespace dnd5e.types.Settings {
    namespace Calendar {
      /** GM-specific calendar settings. */
      type ConfigSchema = {
        enabled: foundry.data.fields.BooleanField<{ required: true }>;
        dailyRecovery: dnd5e.types.fields.RestrictedStringField<"" | "calendar" | "manual", { required: false; blank: true }>;
      };

      /** Player-visible calendar settings. */
      type PreferencesSchema = {
        formatters: foundry.data.fields.SchemaField<{
          date: foundry.data.fields.StringField<{ required: true; initial: "monthDay" }>;
          time: foundry.data.fields.StringField<{ required: true; initial: "hoursMinutes" }>;
        }>;
        visible: foundry.data.fields.BooleanField<{ required: true; initial: true }>;
      };
    }
  }
}

/** A data model that represents the GM-specific calendar settings. */
declare class CalendarConfigSetting extends foundry.abstract.DataModel<
  dnd5e.types.Settings.Calendar.ConfigSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Settings.Calendar.ConfigSchema;

  /** Should item usage recovery be handled manually through the rest dialog? */
  get manualRecovery(): boolean;
}

/** A data model that represents the player visible calendar settings. */
declare class CalendarPreferencesSetting extends foundry.abstract.DataModel<
  dnd5e.types.Settings.Calendar.PreferencesSchema,
  foundry.abstract.DataModel.Any
> {
  static override defineSchema(): dnd5e.types.Settings.Calendar.PreferencesSchema;
}

export { CalendarConfigSetting, CalendarPreferencesSetting };
