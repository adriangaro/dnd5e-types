/**
 * Advancement that presents the player with a choice of multiple items that they can take. Keeps track of which
 * items were selected at which levels.
 *
 * At runtime this `extends ItemGrantAdvancement` (item-choice.mjs:16) purely to inherit grant
 * behavior for `super` calls, but it swaps `metadata.dataModels` to the ItemChoice config/value
 * models. At the type level it must therefore carry the ItemChoice SCHEMA (`type: "ItemChoice"`,
 * its own configuration/value), so it is modeled as `AdvancementMixin(BaseItemChoiceAdvancementData)`
 * like every other advancement — extending the concrete `ItemGrantAdvancement` class instead would
 * bake in the `"ItemGrant"` discriminant and break `Extract`-based `OfType` resolution.
 */

import type BaseItemChoiceAdvancementData from "../../data/advancement/item-choice-data.mjs";
import { AdvancementMixin } from "./mixin.mjs";

declare const ItemChoiceAdvancement_base: ReturnType<typeof AdvancementMixin<typeof BaseItemChoiceAdvancementData>>;

declare class ItemChoiceAdvancement extends ItemChoiceAdvancement_base {
  static metadata: dnd5e.types.Advancement.Metadata & { name: "ItemChoice" };

  /** @override */
  storagePath(level: number): string;

  /**
   * Verify that the provided item can be used with this advancement based on the configuration.
   * @param item              - Item that needs to be tested.
   * @param config            -
   * @param config.type       - Type restriction on this advancement, or `false` to not validate type.
   * @param config.restriction - Additional restrictions to be applied.
   * @param config.strict     - Should an error be thrown when an invalid type is encountered?
   * @returns                 Is this type valid?
   * @throws {Error}          An error if the item is invalid and strict is `true`.
   */
  _validateItemType(
    item: Item.Implementation,
    config?: { type?: globalThis.Item.SubType | false; restriction?: object; strict?: boolean },
  ): boolean;

  /**
   * Current counts of selected items.
   * @param level - Level being advanced.
   * @returns {{ current: number, max: number, full: boolean, replacement: boolean }}
   */
  getCounts(level: number): { current: number; max: number; full: boolean; replacement: boolean };
}

declare global {
  namespace dnd5e.types.Advancement {
    interface DefaultTypes {
      ItemChoice: typeof ItemChoiceAdvancement;
    }
  }
}

export default ItemChoiceAdvancement;
