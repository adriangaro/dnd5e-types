import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the enchant activity.
 */
export default class EnchantSheet extends ActivitySheet<
  dnd5e.types.Activity.OfType<'enchant'>,
  {
    activityOptions: dnd5e.types.FormSelectOption[]
    effectOptions: dnd5e.types.FormSelectOption[]
    allEnchantments: dnd5e.types.FormSelectOption[]
    typeOptions: dnd5e.types.FormSelectOption[]
    propertyOptions: dnd5e.types.FormSelectOption[]
  },
  {

  },
  {

  }
> {}
