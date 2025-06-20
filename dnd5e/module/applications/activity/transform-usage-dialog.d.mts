import type TransformActivity from "@dnd5e/module/documents/activity/transform.mjs";
import ActivityUsageDialog from "./activity-usage-dialog.mjs";

/**
 * Dialog for configuring the usage of the transform activity.
 */
export default class TransformUsageDialog extends ActivityUsageDialog<
  dnd5e.types.Activity.OfType<'transform'>,
  {
    hasCreation: boolean
    transformFields: dnd5e.applications.api.Application5e.FieldsConfig[]
    transformProfile: string
  },
  {

  },
  {

  }
> {
  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Determine the label for a profile in the ability use dialog.
   * @param profile  Profile for which to generate the label.
   * @param rollData         Roll data used to prepare the count.
   * @returns {string}
   */
  getProfileLabel(profile: TransformActivity.TransformProfile, rollData: object): string;
}
