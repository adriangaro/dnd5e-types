import DamageActivityData from "../../data/activity/damage-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for rolling damage.
 */
declare class DamageActivity extends ActivityMixin(DamageActivityData) {
  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  static metadata: DamageActivity.Metadata;
  get metadata(): DamageActivity.Metadata;
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

declare namespace DamageActivity {
  interface Metadata extends ActivityMixin.Metadata {
    sheetClass: typeof dnd5e.applications.activity.DamageSheet
  }
}

export default DamageActivity

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultActivityTypes {
      damage: typeof DamageActivity;
    }
  }
}