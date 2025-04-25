import CastSheet from "../../applications/activity/cast-sheet.mjs";
import CastActivityData from "../../data/activity/cast-data.mjs";
import { staticID } from "../../utils.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for casting a spell from another item.
 */
export default class CastActivity extends ActivityMixin(CastActivityData) {
  /* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */

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
  getSpellChanges(): ActiveEffect.EffectChangeData[]
}
