/** Dialog for configuring the usage of the transform activity. */

import ActivityUsageDialog from "./activity-usage-dialog.mjs";

declare class TransformUsageDialog<
  RenderContext extends object = TransformUsageDialog.RenderContext,
  Configuration extends
    foundry.applications.api.ApplicationV2.Configuration = TransformUsageDialog.Configuration,
  RenderOptions extends
    foundry.applications.api.ApplicationV2.RenderOptions = TransformUsageDialog.RenderOptions,
> extends ActivityUsageDialog<RenderContext, Configuration, RenderOptions> {
  /** @inheritDoc */
  _prepareCreationContext(
    context: RenderContext,
    options: fvttUtils.DeepPartial<RenderOptions>,
  ): Promise<RenderContext>;

  /** Determine the label for a profile in the ability use dialog. */
  getProfileLabel(
    profile: dnd5e.types.data.activity.TransformProfile,
    rollData: dnd5e.types.documents.ActivityRollData,
  ): string;
}

declare namespace TransformUsageDialog {
  interface Any extends TransformUsageDialog<any, any, any> {}
  interface AnyConstructor extends fvttUtils.Identity<typeof TransformUsageDialog<any, any, any>> {}

  interface RenderContext extends ActivityUsageDialog.RenderContext {
    hasCreation?: boolean;
    transformFields?: dnd5e.applications.api.FieldsConfig[];
    transformProfile?: string;
  }
  interface Configuration extends ActivityUsageDialog.Configuration {}
  interface RenderOptions extends ActivityUsageDialog.RenderOptions {}
}

export default TransformUsageDialog;
