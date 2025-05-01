import ActivityUsageDialog from "./activity-usage-dialog.mjs";

/**
 * Dialog for configuring the usage of an activity.
 */
export default class EnchantUsageDialog extends ActivityUsageDialog<
  dnd5e.types.Activity.OfType<'enchant'>, 
  {
    hasCreation: boolean
    enchantment: dnd5e.applications.api.Application5e.FieldsConfig | string | false
  }, 
  {

  },
  {

  }
> {}
