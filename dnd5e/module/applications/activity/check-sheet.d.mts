import * as Trait from "../../documents/actor/trait.mjs";
import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the check activity.
 */
export default class CheckSheet extends ActivitySheet<
  dnd5e.types.Activity.OfType<'check'>,
  {
    abilityOptions: dnd5e.types.FormSelectOption[]
    associatedOptions:dnd5e.types.FormSelectOption[]
    calculationOptions: dnd5e.types.FormSelectOption[]
  },
  {

  },
  {

  }
> {}
