import AdvancementFlow from "./advancement-flow.mjs";
import type ItemGrantAdvancement from "@dnd5e/module/documents/advancement/item-grant.mjs";


/**
 * Inline application that presents the player with a list of items to be added.
 */
export default class ItemGrantFlow<
  Document extends ItemGrantAdvancement<any, any> = ItemGrantAdvancement
> extends AdvancementFlow<
  ItemGrantAdvancement
> {

  /* -------------------------------------------- */

  /**
   * Get the context information for selected spell abilities.
   */
  getSelectAbilities(): {
    options: null | Record<dnd5e.types.Ability.TypeKey, string>,
    selected: dnd5e.types.Ability.TypeKey | null 
  }

  /* -------------------------------------------- */

  /**
   * Handle clicking on a feature during item grant to preview the feature.
   * @protected
   */
  _onClickFeature(event: MouseEvent): Promise<void>
}
