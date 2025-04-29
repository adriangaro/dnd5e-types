import HealActivityData from "../../data/activity/heal-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for rolling healing.
 */
export default class HealActivity extends ActivityMixin(HealActivityData) {
  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle performing a healing roll.
   * @this {HealActivity}
   * @param {PointerEvent} event     Triggering click event.
   * @param {HTMLElement} target     The capturing HTML element which defined a [data-action].
   * @param {ChatMessage5e} message  Message associated with the activation.
   */
  static #rollHealing(this: HealActivity, event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation)
}
