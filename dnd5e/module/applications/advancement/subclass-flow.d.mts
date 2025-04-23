import type SubclassAdvancement from "@dnd5e/module/documents/advancement/subclass.mjs";
import AdvancementFlow from "./advancement-flow.mjs";

/**
 * Inline application that presents the player with a choice of subclass.
 */
export default class SubclassFlow extends AdvancementFlow<
  SubclassAdvancement
> {

  /**
   * Cached subclass dropped onto the advancement.
   */
  subclass: Item.OfType<'subclass'> | null;

  /* -------------------------------------------- */

  /**
   * Handle opening the compendium browser and displaying the result.
   * @protected
   */
  _onBrowseCompendium(event: MouseEvent): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle clicking on a feature during item grant to preview the feature.
   * @protected
   */
  _onClickFeature(event: MouseEvent): Promise<void>

  /* -------------------------------------------- */

  /**
   * Handle deleting a dropped item.
   * @protected
   */
  _onItemDelete(event: MouseEvent): Promise<void>
}
