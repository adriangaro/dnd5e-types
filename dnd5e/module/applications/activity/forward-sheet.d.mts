import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the forward activity.
 */
export default class ForwardSheet extends ActivitySheet<
dnd5e.types.Activity.OfType<'forward'>,
  {
    activityOptions: dnd5e.types.FormSelectOption[]
  },
  {

  },
  {

  }
> {}
