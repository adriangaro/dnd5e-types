/** An application for configuring player visibility settings. */

import BaseSettingsConfig from "./base-settings.mjs";

declare class VisibilitySettingsConfig<
  RenderContext extends object = VisibilitySettingsConfig.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = VisibilitySettingsConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = VisibilitySettingsConfig.RenderOptions,
> extends BaseSettingsConfig<RenderContext, Configuration, RenderOptions> {}

declare namespace VisibilitySettingsConfig {
  interface Any extends VisibilitySettingsConfig<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof VisibilitySettingsConfig<any, any, any>> {}

  interface RenderContext extends BaseSettingsConfig.RenderContext {}
  interface Configuration extends BaseSettingsConfig.Configuration {}
  interface RenderOptions extends BaseSettingsConfig.RenderOptions {}
}

export default VisibilitySettingsConfig;
