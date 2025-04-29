import EnchantActivityData from "../../data/activity/enchant-data.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for enchanting items.
 */
export default class EnchantActivity extends ActivityMixin(EnchantActivityData) {
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

/**
 * Error to throw when an item cannot be enchanted.
 */
export class EnchantmentError extends Error {
  name: 'EnchantmentError'
}
