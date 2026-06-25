/** An application for configuring bastion settings. */

import BastionSetting from "../../data/settings/bastion-setting.mjs";
import BaseSettingsConfig from "./base-settings.mjs";

/** An application for configuring bastion settings. */
declare class BastionSettingsConfig<
  RenderContext extends object = BastionSettingsConfig.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = BastionSettingsConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = BastionSettingsConfig.RenderOptions,
> extends BaseSettingsConfig<RenderContext, Configuration, RenderOptions> {}

declare namespace BastionSettingsConfig {
  interface Any extends BastionSettingsConfig<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof BastionSettingsConfig<any, any, any>> {}

  interface RenderContext extends BaseSettingsConfig.RenderContext {
    fields: typeof BastionSetting.schema.fields;
    source: BastionSetting;
  }
  interface Configuration extends BaseSettingsConfig.Configuration {}
  interface RenderOptions extends BaseSettingsConfig.RenderOptions {}
}

export default BastionSettingsConfig;

export { BastionSetting };
