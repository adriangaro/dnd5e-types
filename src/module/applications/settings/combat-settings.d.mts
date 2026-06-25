/** An application for configuring combat settings. */

import BaseSettingsConfig from "./base-settings.mjs";

declare class CombatSettingsConfig<
  RenderContext extends object = CombatSettingsConfig.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = CombatSettingsConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = CombatSettingsConfig.RenderOptions,
> extends BaseSettingsConfig<RenderContext, Configuration, RenderOptions> {}

declare namespace CombatSettingsConfig {
  interface Any extends CombatSettingsConfig<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof CombatSettingsConfig<any, any, any>> {}

  interface RenderContext extends BaseSettingsConfig.RenderContext {
    legend?: string;
  }
  interface Configuration extends BaseSettingsConfig.Configuration {}
  interface RenderOptions extends BaseSettingsConfig.RenderOptions {}
}

export default CombatSettingsConfig;
