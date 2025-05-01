import CheckActivityData from "../../data/activity/check-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for making ability checks.
 */
declare class CheckActivity extends ActivityMixin(CheckActivityData) {

  static metadata: CheckActivity.Metadata;
  get metadata(): CheckActivity.Metadata;
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

declare namespace CheckActivity {
  interface Metadata extends ActivityMixin.Metadata {
    sheetClass: typeof dnd5e.applications.activity.CheckSheet
  }
}

export default CheckActivity

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultActivityTypes {
      check: typeof CheckActivity;
    }
  }
}