/**
 * Runtime API fragment for `dnd5e.dataModels.settings` — mirrors the runtime
 * `module/data/settings/_module.mjs` (`calendar-setting.mjs` is re-exported via `export *`, surfacing
 * both `CalendarConfigSetting` and `CalendarPreferencesSetting`).
 *
 * Each member is exposed as BOTH a value (`const` → constructor) and a type (`type` → instance),
 * inside an OPEN namespace so a module can declaration-merge its own members in.
 */

declare global {
  namespace dnd5e.dataModels.settings {
    const BastionSetting: typeof import("../settings/bastion-setting.mjs").default;
    type BastionSetting = import("../settings/bastion-setting.mjs").default;

    const CalendarConfigSetting: typeof import("../settings/calendar-setting.mjs").CalendarConfigSetting;
    type CalendarConfigSetting = import("../settings/calendar-setting.mjs").CalendarConfigSetting;

    const CalendarPreferencesSetting: typeof import("../settings/calendar-setting.mjs").CalendarPreferencesSetting;
    type CalendarPreferencesSetting = import("../settings/calendar-setting.mjs").CalendarPreferencesSetting;

    const PrimaryPartySetting: typeof import("../settings/primary-party-setting.mjs").default;
    type PrimaryPartySetting = import("../settings/primary-party-setting.mjs").default;

    const TransformationSetting: typeof import("../settings/transformation-setting.mjs").default;
    type TransformationSetting = import("../settings/transformation-setting.mjs").default;
  }
}

export {};
