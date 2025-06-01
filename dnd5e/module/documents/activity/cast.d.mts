import CastActivityData from "../../data/activity/cast-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for casting a spell from another item.
 */
declare class CastActivity extends ActivityMixin(CastActivityData) {
  /* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */
  static metadata: CastActivity.Metadata;
  get metadata(): CastActivity.Metadata;
  /**
   * Static ID used for the enchantment that modifies spell data.
   */
  static ENCHANTMENT_ID: string;


  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Cached copy of the associated spell stored on the actor.
   */
  get cachedSpell(): Item.OfType<'spell'> | null

  /* -------------------------------------------- */

  /**
   * Should this spell be listed in the actor's spellbook?
   * @type {boolean}
   */
  get displayInSpellbook(): boolean



  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Prepare the data for the cached spell to store on the actor.
   */
  getCachedSpellData(): Promise<ReturnType<Item.OfType<'spell'>['toObject']> | null>

  /* -------------------------------------------- */

  /**
   * Create spell changes based on the activity's configuration.
   */
  getSpellChanges(): ActiveEffect.ChangeData[]
}

declare namespace CastActivity {
  interface Metadata extends ActivityMixin.Metadata {
    sheetClass: typeof dnd5e.applications.activity.CastSheet
  }
}

export default CastActivity

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultActivityTypes {
      cast: typeof CastActivity;
    }
  }
}