import type BaseItemGrantAdvancementData from "../../data/advancement/item-grant-data.mjs";
import { AdvancementMixin } from "./mixin.mjs";

declare const ItemGrantAdvancement_base: ReturnType<typeof AdvancementMixin<typeof BaseItemGrantAdvancementData>>;

/**
 * Advancement that automatically grants one or more items to the player. Presents the player with the option of
 * skipping any or all of the items.
 */
declare class ItemGrantAdvancement extends ItemGrantAdvancement_base {
  static metadata: dnd5e.types.Advancement.Metadata & { name: "ItemGrant" };

  /** The item types that are supported in Item Grant. */
  static VALID_TYPES: Set<Item.SubType>;

  /**
   * Location where the added items are stored for the specified level.
   * @param level - Level being advanced.
   */
  storagePath(level: number): string;

  /**
   * Verify that the provided item can be used with this advancement based on the configuration.
   * @param item    - Item that needs to be tested.
   * @param options - Options controlling validation behaviour.
   * @returns `true` when valid; `false` when invalid and not strict.
   * @throws An error if the item is invalid and `strict` is `true`.
   */
  _validateItemType(item: Item.Implementation, options?: { strict?: boolean }): boolean;
}

declare global {
  namespace dnd5e.types.Advancement {
    interface DefaultTypes {
      ItemGrant: typeof ItemGrantAdvancement;
    }
  }
}

export default ItemGrantAdvancement;
