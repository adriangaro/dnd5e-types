import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the cast activity.
 */
export default class CastSheet extends ActivitySheet<
  dnd5e.types.Activity.OfType<'cast'>,
  {
    spell: Item.OfType<'spell'>
    contentLink: string,

    abilityOptions: dnd5e.types.FormSelectOption[]
    propertyOptions: dnd5e.types.FormSelectOption[]
  },
  {

  },
  {

  }
> {
  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle removing the associated spell.
   * @param event         Triggering click event.
   * @param target  Button that was clicked.
   */
  static #removeSpell(this: CastSheet, event: Event, target: HTMLElement)
}
