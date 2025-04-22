import ItemChoiceConfig from "../../applications/advancement/item-choice-config.mjs";
import ItemChoiceFlow from "../../applications/advancement/item-choice-flow.mjs";
import { ItemChoiceConfigurationData, ItemChoiceValueData } from "../../data/advancement/item-choice.mjs";
import ItemGrantAdvancement from "./item-grant.mjs";

/**
 * Advancement that presents the player with a choice of multiple items that they can take. Keeps track of which
 * items were selected at which levels.
 */
export default class ItemChoiceAdvancement extends ItemGrantAdvancement<
  typeof ItemChoiceConfigurationData,
  typeof ItemChoiceValueData
> {

  /* -------------------------------------------- */

  /**
   * Verify that the provided item can be used with this advancement based on the configuration.
   */
  _validateItemType(
    item: Item.Implementation, 
    config?: { 
      type: Item.SubType, 
      restriction: object, 
      strict?: boolean
    }
  ): boolean
}
