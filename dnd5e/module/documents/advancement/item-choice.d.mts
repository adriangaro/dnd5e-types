import { ItemChoiceConfigurationData, ItemChoiceValueData } from "../../data/advancement/item-choice.mjs";
import type Advancement from "./advancement.d.mts";
import ItemGrantAdvancement from "./item-grant.mjs";

/**
 * Advancement that presents the player with a choice of multiple items that they can take. Keeps track of which
 * items were selected at which levels.
 */
declare class ItemChoiceAdvancement extends ItemGrantAdvancement<
  'ItemChoice',
  typeof ItemChoiceConfigurationData,
  typeof ItemChoiceValueData
> {
  static metadata: ItemChoiceAdvancement.Metadata
  get metadata(): ItemChoiceAdvancement.Metadata

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

declare namespace ItemChoiceAdvancement {
  interface Metadata extends Advancement.Metadata {
    dataModels: {
      config: typeof ItemChoiceConfigurationData,
      value: typeof ItemChoiceValueData
    }
    apps: {
      config: typeof dnd5e.applications.advancement.ItemChoiceConfig
      flow: typeof dnd5e.applications.advancement.ItemChoiceFlow
    }
  }
}

export default ItemChoiceAdvancement

declare global {
  namespace dnd5e.types {
    namespace Advancement {
      interface DefaultAdvancementTypes {
        ItemChoice: typeof ItemChoiceAdvancement
      }
    }
  }
}
