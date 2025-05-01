import EnchantActivityData from "../../data/activity/enchant-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for enchanting items.
 */
declare class EnchantActivity extends ActivityMixin(EnchantActivityData) {
  
  static metadata: EnchantActivity.Metadata;
  get metadata(): EnchantActivity.Metadata;
  
  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * List of item types that are enchantable.
   */
  get enchantableTypes(): Set<string>

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Determine whether the provided item can be enchanted based on this enchantment's restrictions.
   * @param item  Item that might be enchanted.
   */
  canEnchant(item: Item.Implementation): true | EnchantmentError[]
}

declare namespace EnchantActivity {
  interface Metadata extends ActivityMixin.Metadata {
    sheetClass: typeof dnd5e.applications.activity.EnchantSheet
  }
}

export default EnchantActivity


/**
 * Error to throw when an item cannot be enchanted.
 */
export class EnchantmentError extends Error {
  name: 'EnchantmentError'
}

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultActivityTypes {
      enchant: typeof EnchantActivity;
    }
  }
}