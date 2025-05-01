import SaveActivityData from "../../data/activity/save-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for making saving throws and rolling damage.
 */
declare class SaveActivity extends ActivityMixin(SaveActivityData) {
  static metadata: SaveActivity.Metadata;
  get metadata(): SaveActivity.Metadata;
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
    SaveActivity.FavoriteData<this>
  >
}

declare namespace SaveActivity {
  interface Metadata extends ActivityMixin.Metadata {
    sheetClass: typeof dnd5e.applications.activity.SaveSheet
  }
  type FavoriteData<This> = dnd5e.types.FavoriteData5e & {
    save: dnd5e.types.GetKey<This, 'save'>
  }
}

export default SaveActivity

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultActivityTypes {
      save: typeof SaveActivity;
    }
  }
}