import type ItemChoiceAdvancement from "#dnd5e/module/documents/advancement/item-choice.mjs";
import ItemGrantFlow from "./item-grant-flow.mjs";

/**
 * Inline application that presents the player with a choice of items.
 */
export default class ItemChoiceFlow extends ItemGrantFlow<
  ItemChoiceAdvancement
> {
  ability: string;

  /**
   * Set of selected UUIDs.
   */
  selected: Set<string>;

  /**
   * Cached items from the advancement's pool.
   */
  pool: Item.Implementation[];

  /**
   * UUID of item to be replaced.
   */
  replacement: string;

  /**
   * List of dropped items.
   */
  dropped: Item.Implementation[];

  /* -------------------------------------------- */

  /**
   * Handle deleting a dropped item.
   * @protected
   */
  _onItemDelete(event: MouseEvent): Promise<void>

  /* -------------------------------------------- */
  /**
   * Determine the maximum spell slot level for the actor to which this advancement is being applied.
   */
  _maxSpellSlotLevel(): number
}
