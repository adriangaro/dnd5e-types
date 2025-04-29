import UtilityActivityData from "../../data/activity/utility-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Generic activity for applying effects and rolling an arbitrary die.
 */
export default class UtilityActivity extends ActivityMixin(UtilityActivityData) {
  /* -------------------------------------------- */
  /*  Rolling                                     */
  /* -------------------------------------------- */

  /**
   * Roll the formula attached to this utility.
   * @param config   Configuration information for the roll.
   * @param dialog    Configuration for the roll dialog.
   * @param message  Configuration for the roll message.
   * @returns              The created Roll instances.
   */
  rollFormula(
    config?: Promise<dnd5e.dice.BasicRoll.ProcessConfiguration>, 
    dialog?: Promise<dnd5e.dice.BasicRoll.DialogConfiguration>, 
    message?: Promise<dnd5e.dice.BasicRoll.MessageConfiguration> 
  ): Promise<dnd5e.dice.BasicRoll[] | void>

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle rolling the formula attached to this utility.
   * @param event     Triggering click event.
   * @param target     The capturing HTML element which defined a [data-action].
   * @param  message  Message associated with the activation.
   */
  static #rollFormula(this: UtilityActivity, event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation)
}
