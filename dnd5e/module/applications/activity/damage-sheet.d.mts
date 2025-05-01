import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the damage activity.
 */
export default class DamageSheet extends ActivitySheet<
  dnd5e.types.Activity.OfType<'damage'>
> {}
