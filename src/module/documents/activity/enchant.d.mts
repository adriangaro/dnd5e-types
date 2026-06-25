/**
 * Activity for enchanting items.
 * The document = `ActivityMixin(BaseEnchantActivityData)`, registered as the `"enchant"` type.
 */

import type BaseEnchantActivityData from "../../data/activity/enchant-data.mjs";
import { ActivityMixin } from "./mixin.mjs";

declare const EnchantActivity_base: ReturnType<typeof ActivityMixin<typeof BaseEnchantActivityData>>;

declare class EnchantActivity extends EnchantActivity_base {
  static metadata: dnd5e.types.Activity.Metadata & { type: "enchant" };

  // -------------------------------------------- //
  //  Properties                                   //
  // -------------------------------------------- //

  /** List of item types that are enchantable. */
  get enchantableTypes(): Set<globalThis.Item.SubType>;

  /** Existing enchantment applied by this activity on this activity's item. */
  get existingEnchantment(): ActiveEffect.Implementation | undefined;

  // -------------------------------------------- //
  //  Helpers                                      //
  // -------------------------------------------- //

  /**
   * Apply an enchantment to the provided item.
   * @param profile                        ID of the enchantment profile to apply.
   * @param item                           Item to which to apply the enchantment.
   * @param options
   * @param options.chatMessage            Chat message used to make the enchantment, if applicable.
   * @param options.concentration          Concentration active effect to associate with this enchantment.
   * @param options.strict                 Display UI errors and prevent creation if enchantment isn't allowed.
   * @returns Created enchantment effect if the process was successful.
   */
  applyEnchantment(
    profile: string,
    item: globalThis.Item.Implementation,
    options?: {
      chatMessage?: ChatMessage.Implementation;
      concentration?: ActiveEffect.Implementation;
      strict?: boolean;
    }
  ): Promise<ActiveEffect.Implementation | null>;

  /**
   * Determine whether the provided item can be enchanted based on this enchantment's restrictions.
   * @param item     Item that might be enchanted.
   * @param options
   * @returns `true` if the item can be enchanted, or an array of errors if not.
   */
  canEnchant(
    item: globalThis.Item.Implementation,
    options?: { chatMessage?: ChatMessage.Implementation }
  ): true | EnchantmentError[];
}

/**
 * Error to throw when an item cannot be enchanted.
 */
export declare class EnchantmentError extends Error {
  name: "EnchantmentError";
}

declare global {
  namespace dnd5e.types.Activity {
    interface DefaultTypes {
      enchant: typeof EnchantActivity;
    }
  }
}

export default EnchantActivity;
