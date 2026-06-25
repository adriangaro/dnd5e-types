/** An application for configuring variant rules settings. */

import BaseSettingsConfig from "./base-settings.mjs";

/** An application for configuring variant rules settings. */
declare class VariantRulesSettingsConfig<
  RenderContext extends object = VariantRulesSettingsConfig.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = VariantRulesSettingsConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = VariantRulesSettingsConfig.RenderOptions,
> extends BaseSettingsConfig<RenderContext, Configuration, RenderOptions> {}

declare namespace VariantRulesSettingsConfig {
  interface Any extends VariantRulesSettingsConfig<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof VariantRulesSettingsConfig<any, any, any>> {}

  interface RenderContext extends BaseSettingsConfig.RenderContext {
    legend: string;
  }
  interface Configuration extends BaseSettingsConfig.Configuration {}
  interface RenderOptions extends BaseSettingsConfig.RenderOptions {}
}

export default VariantRulesSettingsConfig;
