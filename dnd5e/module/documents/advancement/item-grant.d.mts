import { filteredKeys } from "../../utils.mjs";
import ItemGrantConfig from "../../applications/advancement/item-grant-config.mjs";
import ItemGrantFlow from "../../applications/advancement/item-grant-flow.mjs";
import ItemGrantConfigurationData from "../../data/advancement/item-grant.mjs";
import Advancement from "./advancement.mjs";
import type AdvancementDataField from "@dnd5e/module/data/fields/advancement-data-field.mjs";

/**
 * Advancement that automatically grants one or more items to the player. Presents the player with the option of
 * skipping any or all of the items.
 */
export default class ItemGrantAdvancement<
  ConfigurationData extends AdvancementDataField.ConcreteDataModelConstructor | never = typeof ItemGrantConfigurationData,
  ValueData extends AdvancementDataField.ConcreteDataModelConstructor | never = never
> extends Advancement<
  ConfigurationData,
  ValueData
> {
  /* -------------------------------------------- */

  /**
   * The item types that are supported in Item Grant.
   */
  static VALID_TYPES: Set<Item.SubType>

  /* -------------------------------------------- */
  /*  Application Methods                         */
  /* -------------------------------------------- */

  /**
   * Location where the added items are stored for the specified level.
   */
  storagePath(level: number): string

  /* -------------------------------------------- */

  /**
   * Locally apply this advancement to the actor.
   */
  override apply(level: number, data: object, retainedData?: object): Promise<object>
  /* -------------------------------------------- */

  /**
   * Verify that the provided item can be used with this advancement based on the configuration.
   */
  _validateItemType(item: Item.Implementation, config?: { strict?: boolean }): boolean
}
