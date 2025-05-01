import UtilityActivityData from "../../data/activity/utility-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Generic activity for applying effects and rolling an arbitrary die.
 */
declare class UtilityActivity extends ActivityMixin(UtilityActivityData) {
  static metadata: UtilityActivity.Metadata;
  get metadata(): UtilityActivity.Metadata;
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

declare namespace UtilityActivity {
  interface Metadata extends ActivityMixin.Metadata {
    sheetClass: typeof dnd5e.applications.activity.UtilitySheet
  }
}

export default UtilityActivity

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultActivityTypes {
      utility: typeof UtilityActivity;
    }
  }
}
