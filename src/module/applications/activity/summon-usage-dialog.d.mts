/** Dialog for configuring the usage of the summon activity. */

import ActivityUsageDialog from "./activity-usage-dialog.mjs";
import type ApplicationV2Mixin from "../api/application-v2-mixin.mjs";

declare class SummonUsageDialog<
  RenderContext extends object = SummonUsageDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = SummonUsageDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = SummonUsageDialog.RenderOptions,
> extends ActivityUsageDialog<RenderContext, Configuration, RenderOptions> {
  /** @inheritDoc */
  static PARTS: typeof ActivityUsageDialog.PARTS & {
    creation: foundry.applications.api.HandlebarsApplicationMixin.HandlebarsTemplatePart &
      ApplicationV2Mixin.ApplicationContainerParts;
  };

  /**
   * Determine the label for a profile in the ability use dialog.
   * @param profile   Profile for which to generate the label.
   * @param rollData  Roll data used to prepare the count.
   */
  getProfileLabel(
    profile: dnd5e.types.data.activity.SummonsProfile,
    rollData: dnd5e.types.documents.ActivityRollData,
  ): string;
}

declare namespace SummonUsageDialog {
  interface Any extends SummonUsageDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof SummonUsageDialog<any, any, any>> {}

  interface RenderContext extends ActivityUsageDialog.RenderContext {
    hasCreation?: boolean;
    summonsFields?: dnd5e.applications.api.FieldsConfig[];
    summonsProfile?: string;
  }
  interface Configuration extends ActivityUsageDialog.Configuration {}
  interface RenderOptions extends ActivityUsageDialog.RenderOptions {}
}

export default SummonUsageDialog;
