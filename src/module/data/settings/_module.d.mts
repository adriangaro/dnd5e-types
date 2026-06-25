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
    const BastionSetting: typeof import("./bastion-setting.mjs").default;
    type BastionSetting = import("./bastion-setting.mjs").default;

    const CalendarConfigSetting: typeof import("./calendar-setting.mjs").CalendarConfigSetting;
    type CalendarConfigSetting = import("./calendar-setting.mjs").CalendarConfigSetting;

    const CalendarPreferencesSetting: typeof import("./calendar-setting.mjs").CalendarPreferencesSetting;
    type CalendarPreferencesSetting = import("./calendar-setting.mjs").CalendarPreferencesSetting;

    const PrimaryPartySetting: typeof import("./primary-party-setting.mjs").default;
    type PrimaryPartySetting = import("./primary-party-setting.mjs").default;

    const TransformationSetting: typeof import("./transformation-setting.mjs").default;
    type TransformationSetting = import("./transformation-setting.mjs").default;
  }
}

export {};
