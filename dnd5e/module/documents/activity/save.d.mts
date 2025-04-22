import SaveActivityData from "../../data/activity/save-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for making saving throws and rolling damage.
 */
export default class SaveActivity extends ActivityMixin(SaveActivityData) {
  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle performing a damage roll.
   */
  static #rollDamage(this: SaveActivity, event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation)

  /* -------------------------------------------- */

  /**
   * Handle performing a saving throw.
   */
  static #rollSave(this: SaveActivity, event: PointerEvent, target: HTMLElement, message: ChatMessage.Implementation): Promise<void>

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /** @inheritDoc */
  getFavoriteData(): Promise<
    dnd5e.types.FavoriteData5e & {
      save: SaveActivity['save']
    }
  >
}
