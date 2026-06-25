/** Dialog for configuring the usage of an activity. */

import ActivityUsageDialog from "./activity-usage-dialog.mjs";

declare class EnchantUsageDialog<
  RenderContext extends object = EnchantUsageDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = EnchantUsageDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = EnchantUsageDialog.RenderOptions,
> extends ActivityUsageDialog<RenderContext, Configuration, RenderOptions> {
  get config(): dnd5e.types.documents.activity.EnchantUseConfiguration;
}

declare namespace EnchantUsageDialog {
  interface Any extends EnchantUsageDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof EnchantUsageDialog<any, any, any>> {}

  interface RenderContext extends ActivityUsageDialog.RenderContext {
    hasCreation?: boolean;
    enchantment?: dnd5e.applications.api.FieldsConfig | string | false;
  }
  interface Configuration extends ActivityUsageDialog.Configuration {}
  interface RenderOptions extends ActivityUsageDialog.RenderOptions {}
}

export default EnchantUsageDialog;
