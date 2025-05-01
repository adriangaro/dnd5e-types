import HealActivityData from "../../data/activity/heal-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for rolling healing.
 */
declare class HealActivity extends ActivityMixin(HealActivityData) {
  static metadata: HealActivity.Metadata;
  get metadata(): HealActivity.Metadata;
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

declare namespace HealActivity {
  interface Metadata extends ActivityMixin.Metadata {
    sheetClass: typeof dnd5e.applications.activity.HealSheet
  }

}

export default HealActivity

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultActivityTypes {
      heal: typeof HealActivity;
    }
  }
}