/** An application for configuring calendar settings. */

import BaseSettingsConfig from "./base-settings.mjs";

declare class CalendarSettingsConfig<
  RenderContext extends object = CalendarSettingsConfig.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = CalendarSettingsConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = CalendarSettingsConfig.RenderOptions,
> extends BaseSettingsConfig<RenderContext, Configuration, RenderOptions> {
  /** Prepare rendering context for the DM configuration section. */
  protected _prepareConfigContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;

  /** Prepare rendering context for the player preferences section. */
  protected _preparePreferencesContext(context: RenderContext, options: RenderOptions): Promise<RenderContext>;
}

declare namespace CalendarSettingsConfig {
  interface Any extends CalendarSettingsConfig<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CalendarSettingsConfig<any, any, any>> {}

  interface RenderContext extends BaseSettingsConfig.RenderContext {
    message?: { level: "info" | "warn" | "error"; text: string };
    legend: string;
    disabled?: boolean;
  }
  interface Configuration extends BaseSettingsConfig.Configuration {}
  interface RenderOptions extends BaseSettingsConfig.RenderOptions {}
}

export default CalendarSettingsConfig;
