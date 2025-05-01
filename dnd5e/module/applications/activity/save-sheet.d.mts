import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the save activity.
 */
export default class SaveSheet extends ActivitySheet<
  dnd5e.types.Activity.OfType<'save'>,
  {
    abilityOptions: dnd5e.types.FormSelectOption[]
    calculationOptions: dnd5e.types.FormSelectOption[]
    onSaveOptions: dnd5e.types.FormSelectOption[]
  },
  {

  },
  {

  }
> { }
