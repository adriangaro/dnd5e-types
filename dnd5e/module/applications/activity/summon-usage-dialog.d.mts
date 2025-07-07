import type SummonActivity from "#dnd5e/module/documents/activity/summon.mjs";
import ActivityUsageDialog from "./activity-usage-dialog.mjs";

/**
 * Dialog for configuring the usage of the summon activity.
 */
export default class SummonUsageDialog extends ActivityUsageDialog<
  dnd5e.types.Activity.OfType<'summon'>,
  {
    hasCreation: boolean,
    summonsFields: dnd5e.applications.api.Application5e.FieldsConfig[]
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
  getProfileLabel(profile: SummonActivity.SummonsProfile, rollData: object): string
}
