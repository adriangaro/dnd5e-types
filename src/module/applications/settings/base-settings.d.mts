/**
 * Base application for configuring system settings.
 *
 * Base class for the system's settings sub-menus (combat, variant rules, visibility, …). A plain
 * {@link Application5e} that reads/writes world settings; generic & subclassable via the open interfaces.
 */

import Application5e from "../api/application.mjs";

declare class BaseSettingsConfig<
  RenderContext extends object = BaseSettingsConfig.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = BaseSettingsConfig.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = BaseSettingsConfig.RenderOptions,
> extends Application5e<RenderContext, Configuration, RenderOptions> {
  /**
   * Create the field data for a specific setting.
   * @param name - Setting key within the dnd5e namespace.
   */
  createSettingField(name: string): dnd5e.applications.api.FieldsConfig & { hint: string; label: string };
}

declare namespace BaseSettingsConfig {
  interface Any extends BaseSettingsConfig<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof BaseSettingsConfig<any, any, any>> {}

  interface RenderContext extends Application5e.RenderContext {
    fields: dnd5e.applications.api.FieldsConfig[];
    buttons: foundry.applications.api.ApplicationV2.FormFooterButton[];
  }
  interface Configuration extends Application5e.Configuration {}
  interface RenderOptions extends Application5e.RenderOptions {}
}

export default BaseSettingsConfig;
