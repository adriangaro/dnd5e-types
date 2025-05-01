import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the healing activity.
 */
export default class HealSheet extends ActivitySheet<
  dnd5e.types.Activity.OfType<'cast'>,
  {
    typeOptions: dnd5e.types.FormSelectOption[]
    scalingOptions: dnd5e.types.FormSelectOption[]
  },
  {

  },
  {

  }
> {}
