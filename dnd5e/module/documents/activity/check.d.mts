import CheckActivityData from "../../data/activity/check-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for making ability checks.
 */
export default class CheckActivity extends ActivityMixin(CheckActivityData) {

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle performing an ability check.
   * @param event     Triggering click event.
   * @param target     The capturing HTML element which defined a [data-action].
   * @param message  Message associated with the activation.
   */
  static #rollCheck(
    this: CheckActivity, event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation
  ): Promise<void>
}
