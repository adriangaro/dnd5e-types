import type { Actor5e } from "#dnd5e/module/documents/_module.mjs";
import ActorSheet5e from "./base-sheet.mjs";

/**
 * An Actor sheet for player character type actors.
 */
export default class ActorSheet5eCharacter extends ActorSheet5e {

  /* -------------------------------------------- */

  /**
   * Handle mouse click events for character sheet actions.
   * @param {MouseEvent} event  The originating click event.
   * @returns {Promise}         Dialog or roll result.
   * @protected
   */
  _onSheetAction(event: MouseEvent): Promise<string | dnd5e.dice.D20Roll[] | null | void>;

  /* -------------------------------------------- */

  /**
   * Take a short rest, calling the relevant function on the Actor instance.
   * @param {Event} event             The triggering click event.
   * @returns {Promise<RestResult>}  Result of the rest action.
   * @private
   */
  _onShortRest(event: Event): Promise<ReturnType<Actor5e['shortRest']>>;

  /* -------------------------------------------- */

  /**
   * Take a long rest, calling the relevant function on the Actor instance.
   * @param {Event} event             The triggering click event.
   * @returns {Promise<RestResult>}  Result of the rest action.
   * @private
   */
  private _onLongRest(event: Event): Promise<ReturnType<Actor5e['longRest']>>;
}
