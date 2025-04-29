import DamageActivityData from "../../data/activity/damage-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for rolling damage.
 */
export default class DamageActivity extends ActivityMixin(DamageActivityData) {
  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle performing a damage roll.
   * @param event     Triggering click event.
   * @param target     The capturing HTML element which defined a [data-action].
   * @param message  Message associated with the activation.
   */
  static #rollDamage(
    this: DamageActivity, event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation
  )
}
